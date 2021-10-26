import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../contexts/AppContext';

function Card(props) {
  const {
    name,
    link,
    likes,
  } = props.data;

  const currentUser = useContext(AppContext).currentUser;

  const isLiked = likes.some(like => like._id === currentUser._id);

  const handleCardClick = () => props.onCardClick({ name, link });
  const handleLikeClick = () => props.onCardLike(props.data);
  const handleDeleteClick = () => props.onCardDelete(props.data);

  return (
    <li className='cards__item'>
      <img className='cards__image' src={link} alt={name} onClick={handleCardClick} />
      <h2 className='cards__title'>{name}</h2>
        <div className='cards__like-container'>
          <button
            className={`cards__button-like ${isLiked ? ' cards__button-like_active' : ''}`}
            type='button'
            onClick={handleLikeClick}
            aria-label='Оценить'
          >
          </button>
          <span className='cards__like-counter'>{likes.length}</span>
        </div>

        <button
          className='button cards__button-delete'
          type='button'
          onClick={handleDeleteClick}
          aria-label='Удалить'>
        </button>
    </li>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired
};

export default Card;
