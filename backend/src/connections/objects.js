const oracledb = require('oracledb');
const dbconfig = require('../../dbconfig');

module.exports = {
  async getAllObjects(_, res){
    let connection;
    let response;
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      const {metaData, rows} = await connection.execute(
        `select object_name, object_id, object_type from user_objects`
      );
      
      return res.send({metaData,rows});
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}