const oracledb = require('oracledb');
const dbconfig = require('../../dbconfig');
let connection;
module.exports = {
  async insertClients(req, res){
    let response;
    const {cpf, nome, data_nasc, telefone} = req.body;
    const register_date =  new Date();

    try {
      connection = await oracledb.getConnection(dbconfig.config);
      response = await connection.execute(
        `INSERT INTO CLIENTE VALUES(:cpf, :nome, :data_nasc, :telefone, :register_date)`
      ,{cpf:cpf,nome:nome,data_nasc:new Date(data_nasc),telefone:telefone,register_date:register_date},{
        autoCommit: true
      });
      
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).send(error)
    } finally{
      if (connection){
        try {
          await connection.close();
        } catch (error) {
          return res.status(500).send(error);
        }
      }
    }
  }
}