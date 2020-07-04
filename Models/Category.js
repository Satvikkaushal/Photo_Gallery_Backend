const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 23,
        unique: true
    }
})

module.exports = mongoose.model("Category", categorySchema)