const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    charge: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    deliveryTime: {
        type: Number,
        default: 3,
        required: true
    },
    imageUrl: {
        type: String,
        trim: true
    }
},
    { timestamps: true })

module.exports = mongoose.model("Service", serviceSchema);
