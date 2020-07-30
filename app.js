const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')

const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const categoryRoutes = require('./Routes/category');
const serviceRoutes = require('./Routes/service')
const cartRoutes = require('./Routes/Cart');


const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", serviceRoutes);
app.use("/api/v1", cartRoutes);



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