import React, { useState, useContext, useEffect } from 'react';
import UserContext from './../UserContext';
import ChoredashApi from './../api/ChoredashApi';
import OrdersList from './OrdersList';
import DashboardOrderAlert from './DashboardOrderAlert';

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function getOrders() {
      let orders = await ChoredashApi.getOrders(
        currentUser.id,
        currentUser.type
      );
      setOrders(orders);
    }
    getOrders();
  }, [currentUser.id, currentUser.type]);

  const calculateTotalSales = (ordersArray) => {
    return ordersArray.reduce((sum, acc) => sum + +acc.order_total, 0).toFixed(2);
  };

  return (
    <div className='container'>
      <DashboardOrderAlert />
      <div className='row pt-2'>
        <div className='bg-secondary text-white col-12 pt-2 col-md-3'>
          <h4>Sales</h4>
          <p>Total: ${orders ? calculateTotalSales(orders) : null}</p>
        </div>
        <div className='col-12 bg-light col-md-9'>
          <OrdersList orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
