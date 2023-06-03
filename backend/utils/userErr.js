const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const updateUserField = async (req, res, next, updateData, errorMessage) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError(errorMessage);
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
};

const getUser = async (res, next, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { updateUserField, getUser };
