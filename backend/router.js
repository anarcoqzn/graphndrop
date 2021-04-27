const router = require('express').Router();
const dbconfig = require('./dbconfig');
const infoTables = require('./src/connections/tables');

router.get('/checkConn',dbconfig.checkConnection);
router.post('/newConnection', dbconfig.newConnection);

router.get('/tables/dependencies', infoTables.getTableDependencies);
router.get('/tables', infoTables.getTables)

module.exports = router;