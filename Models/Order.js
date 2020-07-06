const mongoose = require('mongoose')

var Schema = mongoose.Schema;

const orderSchema = new Schema({

})

module.exports = mongoose.model("Order", orderSchema)