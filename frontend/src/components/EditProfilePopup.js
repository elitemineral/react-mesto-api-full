import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';

function EditProfilePopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateUser
  } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(AppContext).currentUser;

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleDescriptionChange = (evt) => setDescription(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name='profile'
      title='Редактировать профиль'
      btnSubmitCaption='Сохранить'
    >
      <input className='form__input' type='text' name='profile-name' value={name || ''} onChange={handleNameChange} placeholder='Имя' minLength={2} maxLength={40} required />
      <input className='form__input' type='text' name='profile-job' value={description || ''} onChange={handleDescriptionChange} placeholder='О себе' minLength={2} maxLength={200} required />
    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired
};

export default EditProfilePopup;
