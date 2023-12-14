import React from 'react';
import { Link } from 'react-router-dom';

function Header({ loggedIn, onSignOut, userEmail, children }) {

  return (
    <header className="header section">
          <div className="logo" />
          <div className="header__nav-wrapper">
            {loggedIn && 
              <>
              <p className="header__email">{userEmail}</p>
              <Link to="/" className="header__nav opacity-transition header__nav_exit" onClick={(onSignOut)}>
                Выйти
              </Link>
              </>
            }
            {children}
          </div>
    </header>
  );
}

export default Header; 