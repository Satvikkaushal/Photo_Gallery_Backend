const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const serviceIDschema = new Schema({
    serviceId: {
        type: ObjectId,
        ref: "Service"
    }
})

const cartSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    services: [serviceIDschema]
})



module.exports = mongoose.model("Cart", cartSchema)

