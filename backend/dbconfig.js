const oracledb = require('oracledb');
const config = {
  user: undefined,
  password: undefined,
  connectString: undefined
}

module.exports = {
  async checkConnection(_,res) {
    let connection;
    try {
      connection = await oracledb.getConnection(config);
      
      return res.send({
        "connection status": "success",
        "credentials":config
      });
    } catch (error) {
      return res.status(500).send(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          return res.send(error);
        }
      }
    }
  },
  config: config,
  async newConnection(req, res) {
    const { dbName, dbUser, dbUserPassword, walletPath } = req.body;
    config.user = dbUser;
    config.password = dbUserPassword;
    config.connectString = dbName;
    
    // await oracledb.initOracleClient({ libDir: walletPath });
    return res.send(config);
  }
}