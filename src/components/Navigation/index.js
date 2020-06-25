import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import Logo from '../../assets/img/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul className="topNav">
    <li className="LogoHeader">
      <Link to={ROUTES.LANDING}>
        <img className="logo" src={Logo} alt="restuary logo"/>
      </Link>
    </li>
    <div className="menuBurgerNav">
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ADDPLACE}>Add a place</Link>
      </li>
      <li>
        <Link to={ROUTES.SETTINGS}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.EXPLORE}>Explore</Link>
      </li>
      {!!authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link to={ROUTES.ADMINISTRATION}>Admin</Link>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </div>
    <label className="burgerMenu" htmlFor="toggle">
      <GiHamburgerMenu />
    </label>
    <input className="burgerToggle" type="checkbox" id="toggle" />
  </ul>
);

const NavigationNonAuth = () => (
  <ul className="LandingMenu">

    <li className="LogoHeader">
      <Link to={ROUTES.LANDING}>
        <img className="logo" src={Logo} alt="restuary logo"/>
      </Link>
    </li>
    <li className="signInBtn">
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <label className="burgerMenu" HtmlFor="toggle">
      <GiHamburgerMenu />
    </label>
    <input className="burgerToggle" type="checkbox" id="toggle" />
  </ul>
);

export default Navigation;
