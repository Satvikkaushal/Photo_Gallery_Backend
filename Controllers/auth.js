const { check, validationResult } = require('express-validator');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt");


exports.signIn = (req, res) => {

    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "user not found"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password does not match"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        res.cookie("token", token, { expire: new Date() + 10 })
        const { _id, name, email, role } = user;

        res.json({
            token, user: {
                _id, name, email, role
            }
        })
    })

}

exports.signUp = (req, res) => {

    // console.log(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Unable to Save"
            })
        }
        res.json(user)
    })

}

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Signed out succesfully"
    });
}


exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
})

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Not admin"
        });
    }
    next();
}