const oracledb = require('oracledb');
const dbconfig = require('../../dbconfig');

module.exports = {
  async getAllObjects(_, res){
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
      
      return res.send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}