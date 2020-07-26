import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { PlaceList, PlaceItem } from '../Places';
import * as ROUTES from '../../constants/routes';

const HomePage = () => (
  <div>
    <Switch>
      <Route exact path={ROUTES.HOME_DETAILS} component={PlaceItem} />
      <Route exact path={ROUTES.HOME} component={PlaceList} />
    </Switch>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
