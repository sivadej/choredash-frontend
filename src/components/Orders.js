import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import ChoredashApi from './../api/ChoredashApi';
import { Link } from 'react-router-dom';
import OrdersList from './OrdersList';

const Orders = () => {
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

  const orderInProgressRender = () => (
    <div className='row pt-2'>
      <div className='col-8 p-2 bg-light text-center col-md-7 offset-md-1'>
        <h5>You have an order in progress</h5>
        <p>Address: 1201 W 82nd Ave </p>
        <button className='btn btn-warning'>It's Done!</button>
      </div>
      <div className='col-4 p-2 bg-light text-center col-md-3 offset-md-0'>
        <p>Current order detail</p>
        <p>
          Chores:
          <br />
          Chore 1<br />
          Chore 2
        </p>
      </div>
    </div>
  );

  return (
    <div className='container'>
      <div className='row pt-2'>
        <div className='col-12 bg-light col-md-10 offset-md-1'>
          <OrdersList orders={orders}/>
        </div>
      </div>
    </div>
  );
};

export default Orders;
