import PropTypes from 'prop-types';

function ImagePopup(props) {
  const {
    card,
    onClose,
  } = props;

  return (
    <section className={`popup popup-image popup_theme_black ${card ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <figure className='popup__image-container'>
          <img className='popup__image' src={card?.link} alt={card?.name} />
          <figcaption className='popup__image-caption'>{card?.name}</figcaption>
        </figure>
        <button className='button popup__button-close' type='button' aria-label='Закрыть' onClick={onClose}></button>
      </div>
    </section>
  );
}

ImagePopup.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired
};

export default ImagePopup;
