require('dotenv').config();
const express = require('express');
const app = express();
app.use('/api', require('./router'));
app.listen(process.env.PORT, console.log("Listening at "+process.env.HOST + ":"+process.env.PORT));