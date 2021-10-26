import PropTypes from 'prop-types';
import resSuccess from '../images/res-success.svg';
import resFailure from '../images/res-failure.svg';

const InfoTooltip = (props) => {
  const {
    isOpen,
    isError,
    onClose
  } = props;

  return (
    <section className={`popup${isOpen ? ' popup_opened' : ''}`}>
      <div className='popup__container'>
        <div className='tooltip'>
          <img className='tooltip__image' src={isError ? resFailure : resSuccess} alt={isError ? 'Ошибка' : 'Успех'} />
          <p className='tooltip__heading'>{isError ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}</p>
        </div>
        <button className='button popup__button-close' type='button' aria-label='Закрыть' onClick={onClose}></button>
      </div>
    </section>
  );
}

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default InfoTooltip;
