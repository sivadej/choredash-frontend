import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import ChoredashApi from './../api/ChoredashApi';
import { Link } from 'react-router-dom';

// Provider dashboard
// Show active order if exists, accept/reject
// Allow provider to toggle availability

const DashboardProvider = () => {
  const { currentUser } = useContext(UserContext);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [message, setMessage] = useState(null);

  async function getPendingOrder() {
    let order = await ChoredashApi.getPendingOrder(currentUser.id);
    setPendingOrder(order);
  }

  useEffect(() => {
    getPendingOrder();
    const timer = setInterval(async () => {
      await getPendingOrder();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const clickAccept = async (e) => {
    e.preventDefault();
    console.log('clicked accept');
    let res = await ChoredashApi.acceptOrder(
      pendingOrder.order_id,
      currentUser.id
    );
    setMessage(JSON.stringify(res));
  };

  const clickReject = async (e) => {
    e.preventDefault();
    console.log('clicked reject');
    let res = await ChoredashApi.rejectOrder(
      pendingOrder.order_id,
      currentUser.id
    );
    setMessage(JSON.stringify(res));
  };

  const clickComplete = async (e) => {
    e.preventDefault();
    console.log('clicked complete');
    let res = await ChoredashApi.confirmCompleteProvider(
      pendingOrder.order_id,
      currentUser.id
    );
    setMessage(JSON.stringify(res));
  };

  const pendingOrderComponent = () => {
    return (
      <div>
        <p>{JSON.stringify(pendingOrder)}</p>
        <button onClick={clickAccept}>Accept</button>
        <button onClick={clickReject}>Reject</button>
      </div>
    )
  }

  //static async acceptOrder(orderId, providerId)
  return (
    <div>
      <h3>pending order</h3>
      {(pendingOrder && pendingOrder.status) ? pendingOrderComponent() : null}
      <p>{message}</p>
      <p>toggle: AVAILABLE | UNAVAILABLE</p>
      <button onClick={clickComplete}>Completed!</button>
      if order_in_progress redirect to order_details
    </div>
  );
};

export default DashboardProvider;
