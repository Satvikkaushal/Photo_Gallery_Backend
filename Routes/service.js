const express = require('express');
const { getAllServices, getService, createService, deleteService, getServiceById } = require('../Controllers/service');
const { getUserById } = require('../Controllers/user');
const router = express.Router();

router.param("serviceId", getServiceById)
router.param("userId", getUserById)

router.get("/services", getAllServices);
router.get("/service/:serviceId", getService);
router.post("/create/service/:userId", createService);
router.delete("/service/:serviceId/:userId", deleteService);

module.exports = router;