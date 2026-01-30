const router = require('express').Router();
const { createClothingItem, getClothingItems, deleteItem } = require('../controllers/clothingItems');

router.post('/', createClothingItem);
router.delete('/:itemId', deleteItem);
module.exports = router;