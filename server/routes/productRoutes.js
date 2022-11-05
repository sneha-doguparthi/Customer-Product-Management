const express = require('express');
const router = express.Router();
const Product = require('../product/product')


router.get('/', Product.getProducts  );
router.post('/addProduct', Product.addProduct)
module.exports = router;