// CUSTOMER OrderDetail component

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChoredashApi from './../api/ChoredashApi';


const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  // set refresh timer for order when status is 'searching' or 'accepted'

  // api req for order details should be restricted to current user
  useEffect(() => {
    async function getOrder() {
      let order = await ChoredashApi.getOrderDetail(orderId);
      setOrder(order);
    }
    getOrder();
  }, [orderId]);

  return (
    <div>
      order detail component for: {JSON.stringify(order)}
    </div>
  )
}

export default OrderDetails;