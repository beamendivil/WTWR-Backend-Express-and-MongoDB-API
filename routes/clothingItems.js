const router = require('express').Router();
const {
	createClothingItem,
	getClothingItems,
	deleteItem,
	likeItem,
	unlikeItem,
} = require('../controllers/clothingItems');

router.post('/', createClothingItem);
router.get('/', getClothingItems);
router.delete('/:itemId', deleteItem);
router.put('/:itemId/likes', likeItem);
router.delete('/:itemId/likes', unlikeItem);
module.exports = router;