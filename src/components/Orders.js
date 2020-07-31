import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import ChoredashApi from './../api/ChoredashApi';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <h4>My Orders</h4>
      <ul>
        {orders !== null ? (
          orders.map((o) => (
            <li key={o._id}><Link to={`/order-details/${o._id}`}>
              {o._id} {o.date_created} - {o.status}</Link>
            </li>
          ))
        ) : (
          <div>no orders found</div>
        )}
      </ul>
      <hr />
      <div>API response: {JSON.stringify(orders)}</div>
    </div>
  );
};

export default Orders;
