const mongoose = require('mongoose')
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const Service = require('./Service');
const ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 23,
        trim: true,
        unique: true

    },
    contact: {
        type: String,
        required: true,
        maxlength: 10,
        unique: true
    },
    profilePic: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    description:{
        type:String
    },
    orders: [
        {
            type: ObjectId,
            ref: "Order"
        }
    ], cart: [{
        type: ObjectId,
        ref: 'Service'
    }],
    tagLine:{
        type:String
    },location:{
        type:String
    }

}, { timestamps: true })

userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password;
    })

userSchema.pre('save', function (next) {
    this.tagLine = `Hey folks!, I am ${this.get('name')}, a quality service provider.` ; 
    next();
});

userSchema.methods = {
    authenticate: function (plainPassword) {
        return this.encryptPassword(plainPassword) === this.encry_password;
    },

    encryptPassword: function (plainPassword) {
        if (!plainPassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        }
        catch (err) {
            return err;
        }
    }
}

module.exports = mongoose.model("User", userSchema);