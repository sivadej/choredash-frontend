import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from './../components/Home';
import Login from './../components/Login';
import Profile from './../components/Profile';
import Chores from './../components/Chores';
import Cart from './../components/Cart';
import Orders from './../components/Orders';
import ChoreDetail from './../components/ChoreDetail';

function Routes({ setToken }) {
  return (
    <div className='pt-5'>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/login'>
          <Login setToken={setToken} />
        </Route>

        <PrivateRoute exact path='/profile'>
          <Profile />
        </PrivateRoute>

        <PrivateRoute exact path='/orders'>
          <Orders />
        </PrivateRoute>

        <PrivateRoute path='/chores/:itemcode'>
          <ChoreDetail />
        </PrivateRoute>

        <PrivateRoute exact path='/chores'>
          <Chores />
        </PrivateRoute>

        <PrivateRoute exact path='/cart'>
          <Cart />
        </PrivateRoute>

      </Switch>
    </div>
  );
}

export default Routes;
