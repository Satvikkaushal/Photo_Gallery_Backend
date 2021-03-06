const express = require('express');
const { getAllServices, getService, createService, deleteService, getServiceById, getServiceByCategory, getServiceByUserId } = require('../Controllers/service');
const { getUserById } = require('../Controllers/user');
const { getCategoryById } = require('../Controllers/category');
const { isSignedIn, isAuthenticated } = require('../Controllers/auth');
const router = express.Router();

router.param("serviceId", getServiceById)
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

router.get("/services", getAllServices);
router.get("/service/:serviceId", getService);
router.get("/:categoryId/services", getServiceByCategory)
router.get("/user/:userId/services", getServiceByUserId)
router.post("/create/:userId/service", isSignedIn, isAuthenticated, createService);
router.delete("/service/:serviceId/:userId", isSignedIn, isAuthenticated, deleteService);

module.exports = router;