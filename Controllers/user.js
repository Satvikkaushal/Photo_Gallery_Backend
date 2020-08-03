const User = require("../Models/User")
const Service = require("../Models/Service")

exports.getUserById = (req, res, next, id) => {
    User.findOne({ _id: id })
        .populate({ path: "cart", model: "Service" })
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    err: "user not found"
                })
            }
            console.log(user)
            req.profile = user;
            next();
        })
}

exports.getUser = (req, res) => {
    // req.profile.salt = undefined;
    // req.profile.encry_password = undefined;
    // req.profile.createdAt = undefined;
    // req.profile.updatedAt = undefined;
    // req.profile.__v = undefined;
    return res.json(req.profile);
}

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) { return res.status(400).json({ err: "No Users foound" }) }
        res.json(users)
    })
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) { return res.status(400).json({ err: "Not able to update" }) }
            res.json(user);
        }
    )
}

exports.addItemTocart = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $addToSet: { cart: req.body.serviceId } },
        { new: true, "upsert": true }
    ).exec((err, cart) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: "cannot update Db"
            })
        }
        res.json(cart);
        console.log(cart)
    });
}
exports.removeItemFromcart = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $pull: { cart: req.body.serviceId } },
        { new: true, "upsert": true }
    ).exec((err, cart) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: "cannot update Db"
            })
        }
        res.json(cart);
        console.log(cart)
    });
}