const oracledb = require('oracledb');
const dbconfig = require('../../dbconfig');

module.exports = {
  async getUserDependencies(req, res) {
    let connection;
    try {
      connection = connection = await oracledb.getConnection(dbconfig.config);

      const response = await connection.execute(
        'select * from cliente'
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