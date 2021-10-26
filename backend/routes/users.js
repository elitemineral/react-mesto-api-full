const router = require('express').Router();

const {
  me,
  getUser,
  getUsers,
  setUserInfo,
  setUserAvatar,
} = require('../controllers/users');

const {
  userIdValidator,
  userInfoValidator,
  userAvatarValidator,
} = require('../utils/requestValidators');

router.get('/users/me', me);
router.get('/users', getUsers);
router.get('/users/:userId', userIdValidator(), getUser);
router.patch('/users/me', userInfoValidator(), setUserInfo);
router.patch('/users/me/avatar', userAvatarValidator(), setUserAvatar);

module.exports = router;
