import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import ChoredashApi from './../api/ChoredashApi';

const Orders = () => {
  const { currentUser } = useContext(UserContext);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function getOrders() {
      let orders = await ChoredashApi.getOrders(currentUser.id);
      setOrders(orders);
    }
    getOrders();
  }, [currentUser.id]);


  return (
    <div>
      <h4>My Orders: {currentUser.firstName}</h4>
      <div>{JSON.stringify(orders)}</div>
    </div>
  );
};

export default Orders;