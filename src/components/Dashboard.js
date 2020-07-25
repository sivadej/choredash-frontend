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
    <div>
      dashboard component - render component or provider dashboard based on user type
      <p>currentUser: {currentUser.email} - {currentUser.type}</p>

      <div>{dashboard(currentUser.type)}</div>
    
    </div>
  )
}

export default Dashboard







