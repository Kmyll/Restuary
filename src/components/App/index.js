import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import AdminPlacesPage from '../AdminPlaces';
import AddPlacePage from '../AddPlace';
import ProfilePage from '../Profile';
import SettingsPage from '../Settings';
import WelcomePage from '../Welcome';
import AdministrationPage from '../Administration';
import ExplorePage from '../Explore';
import LegalPage from '../Legal'
import HelpPage from '../Settings/help'



import * as ROUTES from '../../constants/routes';

import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PROFILE} component={ProfilePage} />
      <Route path={ROUTES.EXPLORE} component={ExplorePage} />
      <Route path={ROUTES.LEGAL} component={LegalPage} />
      <Route path={ROUTES.HELP} component={HelpPage} />
      <Route
        path={ROUTES.ADMINISTRATION}
        component={AdministrationPage}
      />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.ADMINPLACES} component={AdminPlacesPage} />
      <Route path={ROUTES.ADDPLACE} component={AddPlacePage} />
      <Route path={ROUTES.SETTINGS} component={SettingsPage} />
      <Route path={ROUTES.WELCOME} component={WelcomePage} />


    </div>
  </Router>
);

export default withAuthentication(App);
