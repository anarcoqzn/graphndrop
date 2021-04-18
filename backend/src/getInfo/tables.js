const oracledb = require('oracledb');
const dbconfig = require('../../dbconfig');

module.exports = {
  async getTableDependencies(_, res) {
    let connection;
    try {
      const tablesDependencies = [];
      connection = await oracledb.getConnection(dbconfig.config);
      
      const rConstraints = await connection.execute(
        `select constraint_name, table_name,r_constraint_name from USER_CONSTRAINTS where constraint_type='R'`
      );

      const userConsColumns = await connection.execute(
        `select constraint_name, table_name, column_name from user_cons_columns`
      );
      const consNameIndex = rConstraints.metaData.findIndex(obj => (obj.name === 'CONSTRAINT_NAME'));
      const rConsNameIndex = rConstraints.metaData.findIndex(obj => (obj.name === 'R_CONSTRAINT_NAME'));
      
      const uConsNameIndex = userConsColumns.metaData.findIndex(obj => (obj.name === 'CONSTRAINT_NAME'));
      const uTableNameIndex = userConsColumns.metaData.findIndex(obj => (obj.name === 'TABLE_NAME'));
      const uColumnNameIndex = userConsColumns.metaData.findIndex(obj => (obj.name === 'COLUMN_NAME'));

      rConstraints.rows.forEach(constraint => {
        const target = userConsColumns.rows.find(obj =>
          (obj[uConsNameIndex] === constraint[rConsNameIndex]));
        
        const from = userConsColumns.rows.find(obj =>
          (obj[uConsNameIndex] === constraint[consNameIndex]))
        
        tablesDependencies.push({
          'constraint_name': constraint[rConsNameIndex],
          'from': {
            'table': from[uTableNameIndex],
            'column':from[uColumnNameIndex]
          },
          'to': {
            'table': target[uTableNameIndex],
            'column': target[uColumnNameIndex],
          }
        })
      });
      return res.json(tablesDependencies);
    } catch (error) {
      return res.send(error);
    } finally {
      try {
        if (connection) await connection.close();
      } catch (error) {
        return res.send(error);
      }
    }
  },

  async getTables(_, res) {
    let connection;
    const tablesInfo = [];
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      const tables = await connection.execute(
        `select object_name, object_id, created, last_ddl_time, status from user_objects where object_type='TABLE'`
      );
      
      const objName = tables.metaData.findIndex(obj => (obj.name === 'OBJECT_NAME'));
      const objID = tables.metaData.findIndex(obj => (obj.name === 'OBJECT_ID'));
      const created = tables.metaData.findIndex(obj => (obj.name === 'CREATED'));
      const last_ddl_time = tables.metaData.findIndex(obj => (obj.name === 'LAST_DDL_TIME'));
      const status = tables.metaData.findIndex(obj => (obj.name === 'STATUS'));

      for (let i = 0; i < tables.rows.length; i++){
        const attrInfo = (await connection.execute(
          `select column_name, data_type, data_length, data_default from USER_TAB_COLUMNS where table_name='${tables.rows[i][objName]}'`));
        
        const columnName = attrInfo.metaData.findIndex(obj => (obj.name === 'COLUMN_NAME'));
        const dataType = attrInfo.metaData.findIndex(obj => (obj.name === 'DATA_TYPE'));
        const dataLength = attrInfo.metaData.findIndex(obj => (obj.name === 'DATA_LENGTH'));
        const dataDefault = attrInfo.metaData.findIndex(obj => (obj.name === 'DATA_DEFAULT'));
        
        tablesInfo.push(
          {
            "id": tables.rows[i][objID],
            "name": tables.rows[i][objName],
            "created": tables.rows[i][created],
            "lastDdlTime": tables.rows[i][last_ddl_time],
            "status": tables.rows[i][status],
            "attributes": attrInfo.rows.map(attr => {
              return {
                "columnName": attr[columnName],
                "dataType": attr[dataType],
                "dataLength": attr[dataLength],
                "dataDefault": attr[dataDefault]
              }
            })
          })
      }

      return res.json(tablesInfo);
    } catch (error) {
      return res.send(error);
    } finally {
      try {
        if (connection) await connection.close();
      } catch (error) {
        return res.send(error);
      }
    }
  }
}