import { useState, useEffect, useCallback } from 'react';
import headerLogo from '../images/header-logo.svg';
import HeaderMenu from './HeaderMenu';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const MAX_MOBILE_WIDTH = 767;

function Header() {
  const loggedIn = useContext(AppContext).loggedIn;

  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MAX_MOBILE_WIDTH
  );

  const resizeWindow = useCallback(() => {
    const isMobileNew = window.innerWidth <= MAX_MOBILE_WIDTH;
    if (isMobileNew !== isMobile) {
      setIsMobile(isMobileNew);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);

    return () => window.removeEventListener('resize', resizeWindow);
  }, [resizeWindow]);

  const handleBurgerClick = () => {
    setIsActiveMenu(!isActiveMenu);
  };

  return (
    <header className='header'>
      <div className='header__containter'>
        <img className='header__logo' src={headerLogo} alt='Место: Россия' />
        {loggedIn ? (
          <div
            className={`button header__burger${isActiveMenu ? ' header__burger_active' : ''}`}
            onClick={handleBurgerClick}
          >
            <span className={`header__burger-item${isActiveMenu ? ' header__burger-item_active' : ''}`}></span>
          </div>
        ) : (
          <HeaderMenu isMobile={false} isInactive={false} loggedIn={false} />
        )}
      </div>
      {loggedIn && <HeaderMenu isMobile={isMobile} isInactive={!isActiveMenu} loggedIn={loggedIn} />}
    </header>
  );
}

export default Header;
