const oracledb = require('oracledb');
const dbconfig = require('../../dbconfig');
const userObjects = require('../consultations/userObjects');

module.exports = {
  async getTableDependencies(_,res) {
    const response = await userObjects.getTableDependencies();
    
    if (response.errorNum) {
      return res.status(500).send(response);
    } else {
      return res.send(response);
    }
  },

  async getTables(_, res) {
    const response = await userObjects.getTables();
    
    if (response.errorNum) {
      return res.status(500).send(response);
    } else {
      return res.send(response);
    }
  },

  async getUserDependencies(_, res) {
    const response = await userObjects.getUserDependencies();
    
    if (response.errorNum) {
      return res.status(500).send(response);
    } else {
      return res.send(response);
    }
  }
}