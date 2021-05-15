const userObjects = require('../consultations/userObjects');

module.exports = {
  async getAllObjects(_, res) {
    const response = await userObjects.getAllObjects();
    
    if (response.errorNum) {
      return res.status(500).send(response);
    } else {
      return res.send(response);
    }
  }
}