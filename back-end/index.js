const express = require("express");
const dotenv = require("dotenv");
const routes=require("./config/routes");



dotenv.config();
require("./config/mongoDB");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use(routes);

app.listen(port, () => console.log(`Server started on port : ${port}`));
