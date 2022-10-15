require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const { UPDATE_PARAMS } = require('../constants/constants');
const { ERROR_TYPE, HTTP_RESPONSE } = require('../constants/errors');

// POST /users — creates a user
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email,
      }))
      .catch((err) => {
        if (err.name === ERROR_TYPE.validity) {
          next(new BadRequestError());
          return;
        }
        if (err.code === 11000) {
          next(new ConflictError());
        }
        next(err);
      }))
    .catch(next);
};

// GET /users — returns all users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

// GET /users/:userId - returns user by _id
module.exports.getUsersById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(HTTP_RESPONSE.notFound.absentedMessage.user);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

// PATCH /users/me — update profile
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, UPDATE_PARAMS)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(HTTP_RESPONSE.notFound.absentedMessage.user);
      }
      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast || err.name === ERROR_TYPE.validity) {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

// PATCH /users/me/avatar — update avatar
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, UPDATE_PARAMS)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(HTTP_RESPONSE.notFound.absentedMessage.user);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast || err.name === ERROR_TYPE.validity) {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError());
    });
};

// GET /users/me — get profile info
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};
