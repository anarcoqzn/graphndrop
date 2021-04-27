require('dotenv').config();
const oracledb = require('oracledb');
const express = require('express');
const cors = require('cors');
const dbconfig = require('./dbconfig');
const app = express();
const router = require('./router');

// oracledb.initOracleClient({ libDir: "C:\Oracle\instantclient_19_10" });
// dbconfig.checkConnection() // - uncomment for initial testing connection

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.listen(process.env.PORT, console.log(
  "Listening at port " + process.env.PORT + "\n" +
  "Oracle Client Version: " + oracledb.oracleClientVersionString + "\n" +
  "Node-oracle version: " + oracledb.versionString + "\n" +
  "NodeJS version: " + process.version + " [ " + process.platform, process.arch + " ]"
));