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
import Dashboard from './../components/Dashboard';
import Checkout from './../components/Checkout';
import OrderDetails from './../components/OrderDetails';
import DashboardProvider from '../components/DashboardProvider';


function Routes({ setToken, calculateCartTotal }) {
  return (
    <div className='pt-5'>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/login'>
          <Login setToken={setToken} userType='customer' />
        </Route>

        <Route exact path='/provider/login'>
          <Login setToken={setToken} userType='provider' />
        </Route>

        <Route exact path='/hidden/admin/login'>
          <Login setToken={setToken} userType='admin' />
        </Route>

        <PrivateRoute exact path='/profile'>
          <Profile setToken={setToken} />
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
          <Cart calculateCartTotal={calculateCartTotal}/>
        </PrivateRoute>

        <PrivateRoute exact path='/dashboard'>
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute exact path='/provider/dashboard'>
          <DashboardProvider />
        </PrivateRoute>

        <PrivateRoute exact path='/checkout'>
          <Checkout calculateCartTotal={calculateCartTotal}/>
        </PrivateRoute>

        <PrivateRoute path='/order-details/:orderId'>
          <OrderDetails />
        </PrivateRoute>

      </Switch>
    </div>
  );
}

export default Routes;
