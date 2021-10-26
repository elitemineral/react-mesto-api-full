const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { dataModels } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} некорректная ссылка`,
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} некорректный email`,
    },
    required: [true, 'Email обязателен'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  const error = new UnauthorizedError('Неверные почта или пароль');

  return this.findOne({ email }).select('+password')
    .orFail(error)
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw error;
        }

        return user;
      }));
};

module.exports = mongoose.model(dataModels.user, userSchema);
