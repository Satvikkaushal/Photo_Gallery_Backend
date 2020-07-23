const express = require('express');
const { getUserById, getUser, getAllUsers, updateUser } = require('../Controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const router = express.Router();

router.param("userId", getUserById)


router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
router.get("/users", isSignedIn, isAuthenticated, getAllUsers)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)



module.exports = router;