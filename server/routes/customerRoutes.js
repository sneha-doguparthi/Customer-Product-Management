const express = require('express');
const router = express.Router();
const Customer = require('../customer/customer')

router.get('/', Customer.getAllCustomers  );
router.post('/addCustomer', Customer.addCustomer)
router.get('/:customerId', Customer.getProductsByCustomer)
router.post('/:customerId', Customer.addProductByCustomer)

module.exports = router;