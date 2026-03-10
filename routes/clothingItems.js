const router = require('express').Router();
const {
  createClothingItem,
  getClothingItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/clothingItems.js');
const auth = require('../middlewares/auth.js');
const {
  validateCreateItem,
  validateId,
} = require('../middlewares/validation.js');

router.get('/', getClothingItems);

router.use(auth);

router.post('/', validateCreateItem, createClothingItem);
router.delete('/:itemId', validateId, deleteItem);
router.put('/:itemId/likes', validateId, likeItem);
router.delete('/:itemId/likes', validateId, unlikeItem);
module.exports = router;
