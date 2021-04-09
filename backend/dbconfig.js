const oracledb = require('oracledb');

module.exports = {
  async checkConnection() {
    let connection;
    try {
      connection = await oracledb.getConnection(this.config);

      console.log("Connected to DATABASE")
    } catch (error) {
      console.log(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log("CONNECTION TO DATABASE ENDED.");
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  config: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.DATABASE
  }
}