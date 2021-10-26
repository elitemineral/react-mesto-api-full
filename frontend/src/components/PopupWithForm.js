import PropTypes from 'prop-types';

function PopupWithForm(props) {
  const {
    isOpen,
    onClose,
    onSubmit,
    name,
    title,
    btnSubmitCaption,
    children
  } = props;

  return (
    <section className={`popup popup-${name}${isOpen ? ' popup_opened' : ''}`}>
      <div className='popup__container'>
        <form className={`form form-${name}`} name={`form-${name}`} onSubmit={onSubmit}>
          <h2 className='form__heading'>{title}</h2>
          {children}
          <button className='form__button-submit' type='submit'>{btnSubmitCaption}</button>
        </form>
        <button className='button popup__button-close' type='button' aria-label='Закрыть' onClick={onClose}></button>
      </div>
    </section>
  );
}

PopupWithForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  btnSubmitCaption: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default PopupWithForm;
