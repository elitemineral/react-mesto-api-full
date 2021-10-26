const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

const {
  newCardInfoValidator,
  cardIdValidator,
} = require('../utils/requestValidators');

router.get('/cards', getCards);
router.post('/cards', newCardInfoValidator(), createCard);
router.delete('/cards/:cardId', cardIdValidator(), deleteCard);
router.put('/cards/:cardId/likes', cardIdValidator(), addLike);
router.delete('/cards/:cardId/likes', cardIdValidator(), deleteLike);

module.exports = router;
