// CUSTOMER OrderDetail component

import React, { useEffect, useState, useContext } from 'react';
import UserContext from './../UserContext';
import { useParams } from 'react-router-dom';
import ChoredashApi from './../api/ChoredashApi';
import ProviderOrderActions from './ProviderOrderActions';


const OrderDetails = () => {
  const { currentUser } = useContext(UserContext);
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

  const handleOrderComplete = async (e) => {
    e.preventDefault();
    console.log('complete clicked')
  }

  const providerActions = () => {
    return <ProviderOrderActions orderData={order} />
  }

  return (
    <div>
      order detail component for: {JSON.stringify(order)}
      <h5>{currentUser.type === 'provider' ? providerActions() : null}</h5>
      if provider.status is 'waiting', display order details from id current_order, alert for accept/reject order
      ACCEPT: API POST req api/orders/-orderId-/accept/-providerId-
      REJECT: API POST req api/orders/-orderId-/reject/-providerId-
      --- order status 'no_provider_found': offer RETRY-expandsearchrange / CANCEL
      <p>
        {order && order.status === 'order_in_progress' ? <div>in progress. was this order completed?<button onClick={handleOrderComplete}>completed</button></div> : null}
      </p>
    </div>
  )
}

export default OrderDetails;