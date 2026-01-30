const ClothingItem = require('../models/clothingItem');
const {
  INVALID_DATA_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
} = require('../utils/errors');

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_ERROR).send({ message: 'Invalid data passed' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'An error occurred' });
      }
    });
};

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'An error occurred' }));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Item not found' });
      }
      if (String(item.owner) !== String(req.user._id)) {
        return res.status(FORBIDDEN_ERROR).send({ message: 'You are not authorized to delete this item' });
      }
      return item.deleteOne()
        .then(() => res.send({ message: 'Item deleted' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_ERROR).send({ message: 'Invalid ID' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'An error occurred' });
      }
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Item not found' });
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_ERROR).send({ message: 'Invalid ID' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'An error occurred' });
      }
    });
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Item not found' });
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_ERROR).send({ message: 'Invalid ID' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'An error occurred' });
      }
    });
};

// --- CRITICAL PART: EXPORT ALL FUNCTIONS ---
module.exports = {
  createClothingItem,
  getClothingItems,
  deleteItem, 
  likeItem,
  unlikeItem,
};