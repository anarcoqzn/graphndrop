const router = require('express').Router();
const dbconfig = require('./dbconfig');
const infoTables = require('./src/getInfo/tables');
const infoUser = require('./src/getInfo/userInfo');

router.get('/checkConn',dbconfig.checkConnection);

router.get('/getInfo', infoTables.getUserDependencies);

module.exports = router;