import { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import { AppContext } from '../contexts/AppContext';

function Main(props) {
  const {
    cards,
    onEditProfile,
    onAddCard,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete
  } = props;

  const currentUser = useContext(AppContext).currentUser;
  const loggedIn = useContext(AppContext).loggedIn;

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='content'>
        <section className='profile'>
          <button className='profile__button-edit-avatar' type='button' aria-label='Обновить аватар' onClick={onEditAvatar}>
            <img className='profile__avatar' src={currentUser?.avatar} alt='Аватар' />
          </button>
          <div className='profile__info'>
            <div className='profile__container'>
              <h1 className='profile__name'>{currentUser?.name}</h1>
              <button className='button profile__button-edit-profile' type='button' aria-label='Редактировать профиль' onClick={onEditProfile}></button>
            </div>
            <p className='profile__job'>{currentUser?.about}</p>
          </div>
          <button className='button profile__button-add-card' type='button' aria-label='Добавить карточку' onClick={onAddCard}></button>
        </section>

        <section className='cards'>
          <ul className='cards__list'>
            {cards.map(card => (
              <Card
                key={card._id}
                data={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

Main.propTypes = {
  cards: PropTypes.array.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onAddCard: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired
};

export default Main;
