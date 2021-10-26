const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const cardNotFoundError = new NotFoundError('Карточка не найдена');

module.exports.getCards = (_req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => card.populate(['owner', 'likes']))
    .then((populatedCard) => res.send(populatedCard))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(cardNotFoundError)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne({ _id: card._id })
          .then(res.send({ message: 'Пост удалён' }));
      } else {
        throw new ForbiddenError('Запрещено удалять карточки чужих пользователей');
      }
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(cardNotFoundError)
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(cardNotFoundError)
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};
