const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')

const authRoutes = require('./Routes/auth');


const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api/v1", authRoutes);

mongoose.connect('mongodb://localhost:27017/Photo_Gallery',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Db Connected")
    })
    .catch((err) => {
        console.log(err)
    })


app.listen(4000, () => {
    console.log("App is up")
})