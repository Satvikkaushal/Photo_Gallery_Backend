const express = require('express');
const { getUserById, getUser, getAllUsers, updateUser } = require('../Controllers/user');
const { isSignedIn, isAuthenticated } = require('../Controllers/auth');
const router = express.Router();

router.param("userId", getUserById)


router.get("/user/:userId", getUser)
router.get("/users", getAllUsers)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)



module.exports = router;