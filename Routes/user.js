const express = require('express');
const { getUserById, getUser, getAllUsers, updateUser, addItemTocart, removeItemFromcart } = require('../Controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const router = express.Router();

router.param("userId", getUserById)


router.get("/user/:userId", getUser)
router.get("/users", getAllUsers)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.put("/addTocart/:userId", addItemTocart)
router.put("/removeFromcart/:userId", removeItemFromcart)



module.exports = router;
