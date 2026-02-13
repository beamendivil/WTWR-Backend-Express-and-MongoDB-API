const router = require('express').Router();
const {
  createClothingItem,
  getClothingItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/clothingItems.js');
const { validateCreateItem, validateId } = require('../middlewares/validation.js');

router.post('/', validateCreateItem, createClothingItem);
router.get('/', getClothingItems);
router.delete('/:itemId', validateId, deleteItem);
router.put('/:itemId/likes', validateId, likeItem);
router.delete('/:itemId/likes', validateId, unlikeItem);
module.exports = router;