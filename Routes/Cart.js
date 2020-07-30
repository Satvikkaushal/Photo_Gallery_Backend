const express = require('express');
const router = express.Router();
const { getUserById } = require('../Controllers/user');
const { getServiceById } = require('../Controllers/service');
const { getCategoryById } = require('../Controllers/category');
const { getCardByUserId, addTocart, setServiceId } = require('../Controllers/cart');


router.param("userId", getUserById)
router.param("serviceId", getServiceById)
router.param("categoryId", getCategoryById)

router.get("/cart/:userId", getCardByUserId)
router.put("/addTocart/:userId", setServiceId, addTocart)

module.exports = router;

