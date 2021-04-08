const router = require('express').Router();
const factory = require('./src/DDL/factory');
const insert = require('./src/DML/insert');
const getInfo = require('./src/getTableInfo/getInfo');

router.get('/', (req, res) => { return res.send("Hello World") });
router.get('/getInfo', getInfo.getUserDependencies);

// CREATE TABLES
router.post('/init/clients', factory.client);
router.post('/init/address', factory.address);

// POPULATE
router.post('/client', insert.insertClients);
router.post('/client/:id/address', insert.insertAddress);

module.exports = router;