const express = require('express');
const router = express.Router();
const { getItems } = require('../controllers/product');

router.get('/', getItems);

module.exports = router;