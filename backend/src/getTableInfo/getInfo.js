const oracledb = require('oracledb');
const dbconfig = require('../../dbconfig');

module.exports = {
  async getUserDependencies(req, res) {
    let connection;
    try {
      connection = connection = await oracledb.getConnection(dbconfig.config);

      const response = await connection.execute(
        'SELECT DISTINCT REFERENCED_TYPE FROM DBA_DEPENDENCIES ORDER BY REFERENCED_TYPE'
      )
      return res.json(response);
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