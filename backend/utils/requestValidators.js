const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }

  return value;
};

const userIdValidator = () => celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
});

const userInfoValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidator = () => celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

const newCardInfoValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

const cardIdValidator = () => celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
});

const loginInfoValidator = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const newUserInfoValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  userIdValidator,
  userInfoValidator,
  userAvatarValidator,
  newCardInfoValidator,
  cardIdValidator,
  loginInfoValidator,
  newUserInfoValidator,
};
