const express = require('express');
const router = express.Router();
const { getItems, getItem, filterItems } = require('../controllers/product');

router.get('/', getItems);
router.post('/', getItem);
router.post('/filter', filterItems);

module.exports = router;