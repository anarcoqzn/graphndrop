const router = require('express').Router();
const dbconfig = require('./dbconfig');
const infoTables = require('./src/connections/tables');
const objects = require('./src/connections/objects');

router.get('/checkConn',dbconfig.checkConnection);
router.post('/newConnection', dbconfig.newConnection);

router.get('/tables/dependencies', infoTables.getTableDependencies);
router.get('/tables', infoTables.getTables)
router.get('/userDependencies', infoTables.getUserDependencies);
router.get('/objects', objects.getAllObjects);

module.exports = router;