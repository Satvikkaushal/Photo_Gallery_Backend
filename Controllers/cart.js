const Cart = require("../Models/Cart")

exports.getCardByUserId = (req, res) => {

}

exports.addTocart = (req, res) => {
    console.log("add to cart")
    console.log(req.serviceId)

    Cart.findOneAndUpdate(
        { userId: req.profile._id },
        { $push: { services: req.serviceId } }, { new: true, "upsert": true }).exec((err, cart) => {
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

exports.removeTocart = (req, res) => {
    console.log("add to cart")
    console.log(req.serviceId)

    Cart.findOneAndUpdate(
        { userId: req.profile._id },
        { $pop: { services: req.serviceId } }, { new: true, "upsert": true }).exec((err, cart) => {
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

exports.setServiceId = (req, res, next) => {
    console.log("set service")
    req.serviceId = req.body;
    console.log(req.serviceId)
    next();
}