const oracledb = require("oracledb");
const dbconfig = require('../../dbconfig');

module.exports = {
  async getAllObjects() {
    let connection;
    let response;
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      const {metaData, rows} = await connection.execute(
        `select object_name, object_id, object_type, created, last_ddl_time, status from user_objects`
      );

      const name = metaData.findIndex(obj => (obj.name === 'OBJECT_NAME'));
      const id = metaData.findIndex(obj => (obj.name === 'OBJECT_ID'));
      const type = metaData.findIndex(obj => (obj.name === 'OBJECT_TYPE'));
      
      const created = metaData.findIndex(obj => (obj.name === 'CREATED'));
      const lastDdlTime = metaData.findIndex(obj => (obj.name === 'LAST_DDL_TIME'));
      const status = metaData.findIndex(obj => (obj.name === 'STATUS'));
      
      response = rows.map(obj => {
        return {
          'object_name': obj[name],
          'object_id': obj[id],
          'object_type': obj[type],
          'created': obj[created],
          'lastDDLTime': obj[lastDdlTime],
          'status': obj[status]
        }
      });
      
      return response;
    } catch (error) {
      return error;
    } finally {
      try {
        if (connection) await connection.close();
      } catch (error) {
        return error;
      }
    }
  },
  async getTableDependencies() {
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
          'constraint_name': constraint[uConsNameIndex],
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
      return tablesDependencies;
    } catch (error) {
      return error;
    } finally {
      try {
        if (connection) await connection.close();
      } catch (error) {
        return error;
      }
    }
  },

  async getTables() {
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

      return (tablesInfo);
    } catch (error) {
      return (error);
    } finally {
      try {
        if (connection) await connection.close();
      } catch (error) {
        return (error);
      }
    }
  },

  async getUserDependencies() {
    let connection;
    let response = [];
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      const { metaData, rows } = await connection.execute(
        `select * from user_dependencies where referenced_owner='${dbconfig.config.user}'`
      );

      const name = metaData.findIndex(obj => (obj.name === "NAME"));
      const type = metaData.findIndex(obj => (obj.name === "TYPE"));
      const refOwner = metaData.findIndex(obj => (obj.name === "REFERENCED_OWNER"));
      const refName = metaData.findIndex(obj => (obj.name === "REFERENCED_NAME"));
      const refType = metaData.findIndex(obj => (obj.name === "REFERENCED_TYPE"));
      const refLinkName = metaData.findIndex(obj => (obj.name === "REFERENCED_LINK_NAME"));
      const schemaID = metaData.findIndex(obj => (obj.name === "SCHEMAID"));
      const depType = metaData.findIndex(obj => (obj.name === "DEPENDENCY_TYPE"));

      response = rows.map(dep => {
        return{
          name: dep[name],
          type: dep[type],
          refOwner: dep[refOwner],
          refName: dep[refName],
          refType: dep[refType],
          refLinkName: dep[refLinkName],
          schemaID: dep[schemaID],
          depType: dep[depType]
        }
      });

      return (response);
    } catch (error) {
      return (error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          return (error);
        }
      } 
    }
  }
}