const express = require('express');
const { signIn, signOut, signUp } = require('../Controllers/auth');
const { check } = require('express-validator');
const router = express.Router();


router.get("/", (req, res) => {
    res.send(
        "Hello"
    )
})

router.post("/signIn", [
    check("email", "Please Enter valid Email").isEmail().isLength({ min: 1 }),
    check("password", "password is required").isLength({ min: 3 }),
], signIn);

router.post("/signUp", [
    check("email", "Please Enter valid Email").isEmail().isLength({ min: 1 }),
    check("password", "password is required").isLength({ min: 1 }),
], signUp);

router.get("/signOut", signOut);


module.exports = router;