import { Link, useHistory } from 'react-router-dom';
import { appRoutes } from '../utils/constants';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const HeaderMenu = (props) => {
  const hst = useHistory();
  const user = useContext(AppContext).currentUser;
  const handleLogout = useContext(AppContext).handleLogout;

  const { isMobile, isInactive, loggedIn } = props;

  const signOut = () => handleLogout();

  return (
    <nav
      className={`header__menu${
        isInactive && isMobile ? ' header__menu_inactive' : ''
      }${isMobile ? ' header__menu_mobile' : ''}`}
    >
      {loggedIn && <h2 className='header__menu-heading'>{user.email}</h2>}
      <ul className='header__menu-links'>
        {loggedIn ? (
          <li><button className='link header__menu-link header__menu-button' onClick={signOut}>Выйти</button></li>
        ) : hst.location.pathname === appRoutes.signIn ? (
          <li>
            <Link className='link header__menu-link' to={appRoutes.signUp}>
              Регистрация
            </Link>
          </li>
        ) : (
          <li>
            <Link className='link header__menu-link' to={appRoutes.signIn}>
              Войти
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

HeaderMenu.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isInactive: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default HeaderMenu;
