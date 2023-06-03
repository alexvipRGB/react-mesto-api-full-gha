const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const secretKey = require('../utils/secretKey');
const { getUser, updateUserField } = require('../utils/userErr');

const { NODE_ENV } = process.env;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    await getUser(res, next, req.user._id);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await getUser(res, next, userId);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    if (!user) {
      throw new NotFoundError('Пользователь не создан');
    } else {
      res.status(201).send({
        name,
        about,
        avatar,
        email,
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      const conflictError = new ConflictError('Email уже используется');
      next(conflictError);
    } else {
      next(err);
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updateData = { name, about };
    await updateUserField(req, res, next, updateData, 'Пользователь не обновлен');
  } catch (err) {
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updateData = { avatar };
    await updateUserField(req, res, next, updateData, 'Аватар не обновлен');
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedError('Неправильная почта или пароль');
    }

    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : secretKey, {
      expiresIn: '7d',
    });

    const cookieOptions = {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    };

    res.cookie('jwt', token, cookieOptions);

    res.send({ message: 'Успешная аутентификация' });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Кук успешно удален.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateUserAvatar, login, logout, getCurrentUser,
};
