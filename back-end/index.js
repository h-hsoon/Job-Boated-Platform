const express = require("express");
const dotenv = require("dotenv");
const routes=require("./config/routes");
const cors = require('cors');



const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5000'] 
};




dotenv.config();
require("./config/mongoDB");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors(corsOptions)); 

app.use(express.json())
app.use(routes);

app.listen(port, () => console.log(`Server started on port : ${port}`));
