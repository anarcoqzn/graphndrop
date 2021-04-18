const router = require('express').Router();
const dbconfig = require('./dbconfig');
const infoTables = require('./src/getInfo/tables');

router.get('/checkConn',dbconfig.checkConnection);

router.get('/tables/dependencies', infoTables.getTableDependencies);
router.get('/tables', infoTables.getTables)

module.exports = router;