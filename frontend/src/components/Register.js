import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { appRoutes } from '../utils/constants';
import Header from './Header';

const Register = () => {
  const handleRegister = useContext(AppContext).handleRegister;

  const [registerData, setRegisterData] = useState({});
  const handleChange = (evt) => {
    setRegisterData({
      ...registerData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(registerData);
  };

  return (
    <>
      <Header />
      <section className='register'>
        <form
          className='form form_theme_dark'
          name='form-register'
          onSubmit={handleSubmit}
        >
          <h2 className='form__heading form__heading_theme_dark'>
            Регистрация
          </h2>
          <input
            className='form__input form__input_theme_dark'
            name='email'
            type='email'
            placeholder='Email'
            value={registerData.email || ''}
            onChange={handleChange}
            required
          />
          <input
            className='form__input form__input_theme_dark'
            name='password'
            type='password'
            placeholder='Пароль'
            minLength={8}
            maxLength={15}
            value={registerData.password || ''}
            onChange={handleChange}
            required
          />
          <button
            className='form__button-submit form__button-submit_theme_dark'
            type='submit'
          >
            Зарегистрироваться
          </button>
        </form>
        <div className='register__signin'>
          <p className='register__question'>Уже зарегистрированы?</p>
          <Link className='link register__link' to={appRoutes.signIn}>
            Войти
          </Link>
        </div>
      </section>
    </>
  );
};

export default Register;
