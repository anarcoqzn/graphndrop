require('dotenv').config();
const oracledb = require('oracledb');
const express = require('express');
const dbconfig = require('./dbconfig');
const app = express();
const router = require('./router');

oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_10' });
dbconfig.checkConnection();
app.use('/api', router);
app.listen(process.env.PORT, console.log("Listening at port " + process.env.PORT));