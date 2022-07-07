const express = require('express');
const router = express.Router();
const { getItems, getItem } = require('../controllers/product');

router.get('/', getItems);
router.post('/', getItem)

module.exports = router;