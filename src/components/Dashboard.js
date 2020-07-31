import React, { useContext } from 'react';
import DashboardCustomer from './DashboardCustomer';
import DashboardProvider from './DashboardProvider';
import UserContext from './../UserContext';

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);

  // render dashboard dashboard based on user type
  const dashboard = (type) => {
    if (type==='customer') return <DashboardCustomer />
    else if (type==='provider') return <DashboardProvider />
    else return <div>Dashboard rendering error</div>
  }

  return (
      <div>{dashboard(currentUser.type)}</div>
  )
}

export default Dashboard







