const oracledb = require('oracledb');
const dbconfig = require('../../dbconfig');
let connection;

const states = ['AC', 'AL', 'AP','AM', 'BA','CE', 'ES','DF', 'GO', 'MA', 'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

module.exports = {
  async client(_, res) {
    let response;
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      response = await connection.execute(`CREATE TABLE CLIENTE(cpf CHAR(11),nome VARCHAR(40) NOT NULL,data_nasc DATE NOT NULL, telefone VARCHAR(15) NOT NULL,register_date DATE DEFAULT SYSDATE,CONSTRAINT CLIENTES_PKEY PRIMARY KEY (cpf),CONSTRAINT CPF_LENGTH CHECK(length(cpf)=11),CONSTRAINT MAIOR_AGE CHECK(register_date - data_nasc >= 18))`);

      return res.json({"response": response, "connection":connection});
    } catch (error) {
      return res.status(400).send({"error": error,"connection":connection});
    } finally {
      if (connection) {
        try {
          (await connection.close());
        } catch (error) {
          console.log(error);
        }
      }
    }
  },

  async address(_, res){
    let response;
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      response = await connection.execute(`
      CREATE TABLE ENDERECO(
        id SERIAL,
        cpf_cliente CHAR(11) NOT NULL,
        estado CHAR(2) NOT NULL,
        cidade VARCHAR(20) NOT NULL,
        bairro VARCHAR(20) NOT NULL,
        rua VARCHAR(20) NOT NULL,
        numero INTEGER NOT NULL,
        tipo VARCHAR(10) NOT NULL,
        CONSTRAINT ENDERECO_PKEY PRIMARY KEY (id),
        CONSTRAINT ENDERECO_CPF_CLIENTE_FKEY FOREIGN KEY (cpf_cliente) REFERENCES CLIENTES(cpf),
        CONSTRAINT TIPO_CHK CHECK(tipo='RESIDENCIA' OR tipo='TRABALHO' OR TIPO='OUTRO'))
      `)
    }catch (error) {
        return res.status(400).send({"error": error,"connection":connection});
    } finally {
    if (connection) {
      try {
        (await connection.close());
      } catch (error) {
          console.log(error);
        }
      }
    }
  },

  async medicines(_, res){
    let response;
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      
    }catch (error) {
        return res.status(400).send({"error": error,"connection":connection});
    } finally {
    if (connection) {
      try {
        (await connection.close());
      } catch (error) {
          console.log(error);
        }
      }
    }
  },

  async drugstore(_, res){
    let response;
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      
    }catch (error) {
        return res.status(400).send({"error": error,"connection":connection});
    } finally {
    if (connection) {
      try {
        (await connection.close());
      } catch (error) {
          console.log(error);
        }
      }
    }
  },

  async employees(_, res){
    let response;
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      
    }catch (error) {
        return res.status(400).send({"error": error,"connection":connection});
    } finally {
    if (connection) {
      try {
        (await connection.close());
      } catch (error) {
          console.log(error);
        }
      }
    }
  },

  async sales(_, res){
    let response;
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      
    }catch (error) {
        return res.status(400).send({"error": error,"connection":connection});
    } finally {
    if (connection) {
      try {
        (await connection.close());
      } catch (error) {
          console.log(error);
        }
      }
    }
  },

  async delivering(_, res){
    let response;
    try {
      connection = await oracledb.getConnection(dbconfig.config);
      
    }catch (error) {
        return res.status(400).send({"error": error,"connection":connection});
    } finally {
    if (connection) {
      try {
        (await connection.close());
      } catch (error) {
          console.log(error);
        }
      }
    }
  }
}