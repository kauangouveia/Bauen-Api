const express = require("express");
const app = express();
//dizemos para o express que ele pode aceitar json
app.use(express.json());
module.exports = app;