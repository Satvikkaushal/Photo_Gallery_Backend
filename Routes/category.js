const express = require('express');
const { getUserById } = require('../Controllers/user');
const { getCategoryById, getAllCategories, createCategory, updateCategory, removeCategory } = require('../Controllers/category');
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const router = express.Router();

router.param("categoryId", getCategoryById);
router.param("userId", getUserById)

router.get("/categories", getAllCategories)
router.post("/create/category/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);
module.exports = router;