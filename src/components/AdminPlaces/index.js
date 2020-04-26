import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { PostList, PostItem } from '../AdminPost';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { FaUsersCog } from 'react-icons/fa';

const AdminPage = () => (
  <div className="admin_container">
    <h1>
      <FaUsersCog />
      Admin places
    </h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMINPLACES_DETAILS} component={PostItem} />
      <Route exact path={ROUTES.ADMINPLACES} component={PostList} />
    </Switch>
  </div>
);

const condition = (authUser) =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
