const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
require("./config/mongoDB");

const port = process.env.PORT || 5000;
const app = express();

// test router
app.get("/", (req, res) => res.send("server is ready"));

app.listen(port, () => console.log(`Server started on port : ${port}`));
