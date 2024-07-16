const express = require("express");
const dotenv = require("dotenv");
const routes=require("./config/routes");
const cors = require('cors');
const cookieParser = require('cookie-parser')

dotenv.config();
require("./config/mongoDB");

const port = process.env.PORT ||5000;
const app = express();
app.use(cookieParser())
app.use(cors());
app.use(express.json())
app.use(routes);

app.listen(port, () => console.log(`Server started on port : ${port}`));
