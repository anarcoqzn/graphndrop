const oracledb = require(`oracledb`);
const dbconfig = require("../../dbconfig");
const { randomString, containSQLInjections }= require('../util');

module.exports = {
  async table(req, res) {
    let connection;
    const { id } = req.params;
    
    if (containSQLInjections(id)) {
      return res.status(400).send('SQL Injection detected');
    }

    try {
      connection = await oracledb.getConnection(dbconfig.config);
      
      const { rows: table } = await connection.execute(
        `select object_name from user_objects where object_id=:id`,[id]
      );
      const tableName = table[0][0];
      const cloneTableName = randomString();
      oracledb.fetchAsString = [oracledb.CLOB];
      // Get DDL information
      const { rows: originalTableDDL } = await connection.execute(
        `select dbms_metadata.get_ddl('TABLE','${tableName}','${dbconfig.config.user}') FROM DUAL`
      );
      // -----
      // backup
      await connection.execute(`create table ${cloneTableName} as select * from ${tableName}`);
      // ----
      // DROP TABLE
      const dropResult = await connection.execute(`DROP TABLE ${tableName}`);
      // ----
      // IF DROP TABLE WAS SUCCESSFUL, CREATE DROPPED TABLE
      await connection.execute(originalTableDDL[0][0]);
      // ----
      // Columns with data default GENERATED ALWAYS AS IDENTITY (sequence.nextval) shall not be on insert
      
      const { metaData, rows: columns } = await connection.execute(
        `select column_name, data_default from user_tab_columns where table_name='${tableName}'`);
      
      const column_name = metaData.findIndex(elem => (elem.name === 'COLUMN_NAME'));
      const data_default = metaData.findIndex(elem => (elem.name === 'DATA_DEFAULT'));
      
      let insertValues = [];
      for (let index = 0; index < columns.length; index++){
        const elem = columns[index];
        
        if ( elem[data_default] === null || !elem[data_default].includes('nextval') ) {
          insertValues.push(elem[column_name]);
        }
      };

      insertValues = insertValues.join(',');
      // ----
      // Restoring data from backup
      await connection.execute(
        "INSERT INTO "+ tableName + "("+insertValues+")"+"SELECT "+insertValues+" FROM "+cloneTableName
      );
      // --
      await connection.execute('DROP TABLE ' + cloneTableName);
      await connection.execute('purge recyclebin');
      
      return res.json(dropResult);
    } catch (error) {
      return res.status(500).send(error);
    } finally {
      try {
        if (connection) await connection.close();
      } catch (error) {
        console.log(error);
      }
    }
  }
}