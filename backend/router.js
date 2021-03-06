const router = require('express').Router();
const dbconfig = require('./dbconfig');
const infoTables = require('./src/objects/tables');
const objects = require('./src/objects/objects');

router.get('/checkConn',dbconfig.checkConnection);
router.post('/connections', dbconfig.newConnection);
router.delete('/connections/:id', dbconfig.removeConnection);
router.get('/connections/:id?', dbconfig.getConnections);
router.patch('/connections', dbconfig.setConnection);
router.put('/connections/:id', dbconfig.updateConnection);

router.get('/tables/dependencies', infoTables.getTableDependencies);
router.get('/tables', infoTables.getTables)
router.get('/userDependencies', infoTables.getUserDependencies);
router.get('/objects', objects.getAllObjects);
module.exports = router;