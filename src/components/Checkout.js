import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import ChoredashApi from './../api/ChoredashApi';
import { useHistory } from 'react-router-dom';

const Checkout = ({calculateCartTotal}) => {
  const history = useHistory();
  const { currentUser, cart, setCart } = useContext(UserContext);
  const [address, setAddress] = useState(null);
  const [alert, setAlert] = useState(null);

  // API request for customer address
  useEffect(() => {
    async function getAddress() {
      let response = await ChoredashApi.getCustomerAddress(currentUser.id);
      setAddress(response);
    }
    getAddress();
  }, [currentUser.id]);

  // on confirm button press - API request to POST checkout
  // API responds with order number. display order confirmed and link
  // to order detail page
  async function finalizeCheckout() {
    let orderResponse = await ChoredashApi.checkout(currentUser.id);
    console.log(orderResponse.success);
    if (orderResponse.success) {
      console.log('redirecting to success page',orderResponse.orderId)
      setAlert(null);
      setCart([]);
      history.push(`/order-details/${orderResponse.orderId}`);
    }
    else setAlert('something went wrong! order not submitted.')
  }

  return (
    <div>
      {JSON.stringify(cart)}
      CHECKOUT - confirm address {JSON.stringify(address)} - payment details *mock payment info* - 
      <p>Total: {calculateCartTotal()} - <button onClick={finalizeCheckout}>confirm order!</button></p>
      <p>{alert}</p>
    </div>
  )
}

export default Checkout;