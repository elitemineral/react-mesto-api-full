const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, _res, next) => {
  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError('С токеном что-то не так');
  }

  req.user = payload;

  next();
};
