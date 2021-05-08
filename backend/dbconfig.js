const oracledb = require('oracledb');

const config = {
  user: undefined,
  password: undefined,
  connectString: undefined,
  dbName:  undefined
}

const connections = [];

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
    const { dbName, dbUser, dbUserPassword, connectString } = req.body;
    const conn = {
      id: connections.length === 0 ? 0 : connections[connections.length - 1].id + 1,
      user: dbUser,
      password: dbUserPassword,
      connectString: connectString || dbName,
      dbName: dbName
    }
    
    if (!connections.find(obj => obj.user === conn.user && obj.connectString === conn.connectString)) {
      await connections.push(conn);
    };
    
    return res.send(connections);
  },
  removeConnection(req, res){
    const { id } = req.params ;
    const index = connections.findIndex(obj => (String(obj.id) === id));
    if ( index !== -1 ) connections.splice(index, 1);
    return res.send(connections);
  },
  setConnection(req, res) {
    const { id } = req.body;
    const conn = connections.find(obj => (obj.id === id));
    if (conn === undefined) return res.status(404).send("Not found");
    config.id = conn.id;
    config.user = conn.user;
    config.connectString = conn.connectString;
    config.password = conn.password;
    config.dbName = conn.dbName;

    return res.send(config);
  },

  getConnections(req, res) {
    const { id } = req.params;
    if (id) return res.json(connections.find(obj => obj.id == id));
    else return res.json(connections);
  },

  updateConnection(req, res) {
    const { dbName, dbUser, dbUserPassword, walletPath } = req.body;
    const { id } = req.params;
    const index = connections.findIndex(obj => obj.id == id);
    
    if (index === -1) return res.status(404).json("Not found");
    if (dbName) connections[index].connectString = dbName;
    if (dbUser) connections[index].user = dbUser;
    if (dbUserPassword) connections[index].password = dbUserPassword;

    return res.json(connections[index]);
  }
}