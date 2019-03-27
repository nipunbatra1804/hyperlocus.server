const express = require("express");
const index = require("./routes/index");
const towns = require("./routes/towns");

const app = express();
app.use(express.static("public"));
app.use("/", index);

module.exports = app;
