const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('/', auth, orderController.createOrder);
router.get('/me', auth, orderController.getUserOrders);
router.get('/', auth, admin, orderController.getAllOrders);
router.get('/count', auth, admin, orderController.getOrdersCount);
router.get('/:id', auth, admin, orderController.getOrderById);

module.exports = router;
