const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For creating tokens
const User = require("../models/user.js");
const { JWT_SECRET } = require("../utils/config.js");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors.js");

// 1. Create User (Sign Up)
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  // Hash the password before creating the user
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash, // Save the hash, not the plain password
      })
    )
    .then((user) => {
      // Remove password from the response object for security
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed"));
      }
      return next(err);
    });
};

// 2. Login (Sign In)
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  // Use the custom method from models/user.js
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Create a Token that expires in 7 days
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};

// 3. Get Current User (GET /users/me)
const getCurrentUser = (req, res, next) => {
  // req.user._id will come from the auth middleware we build next
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch(next);
};

// 4. Update Profile (PATCH /users/me)
const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  // Use req.user._id to ensure they only edit their own profile
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed"));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
