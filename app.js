const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('dotenv').config();




module.exports = app;