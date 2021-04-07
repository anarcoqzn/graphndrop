const router = require('express').Router();
const factory = require('./src/DDL/factory');
const insert = require('./src/DML/insert');
const getInfo = require('./src/getTableInfo/getInfo');

router.get('/', (req, res) => { return res.send("Hello World") });
router.get('/getInfo', getInfo.getUserDependencies);

router.post('/init', factory.client);
router.post('/client', insert.insertClients);

module.exports = router;