const router = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users.js');
const { validateUpdateProfile } = require('../middlewares/validation.js');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateProfile, updateProfile);
module.exports = router;
