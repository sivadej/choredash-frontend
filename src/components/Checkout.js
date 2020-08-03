import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import ChoredashApi from './../api/ChoredashApi';
import { useHistory } from 'react-router-dom';

const Checkout = ({ calculateCartTotal }) => {
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
      console.log('redirecting to success page', orderResponse.orderId);
      setAlert(null);
      setCart([]);
      history.push(`/order-details/${orderResponse.orderId}`);
    } else setAlert('Something went wrong! Order not submitted.');
  }

  return (
    <div>
      <div className='container'>
        <div className='row pt-2'>
          <div className='col-12 p-2 bg-info text-center text-white'>
            <h5>Checkout</h5>
          </div>
        </div>

        <div className='row pt-2'>
          <div className='bg-secondary text-white col-12 pt-2 pb-2 col-md-3'>
            <h4>Total</h4>
            <h6>{ cart ? '$ '+calculateCartTotal() : null}</h6>
            <hr/>
            <h5>Address</h5>
            {address ? (
              <small>
                {address.address.line1}
                <br />
                {address.address.line2}
                <br />
                {address.address.city}{', '}{address.address.state}{' '}
                {address.address.zip}
                <br />
              </small>
            ) : (
              <div class='spinner-border'></div>
            )}
          </div>
          <div className='col-12 bg-light col-md-9'>
            <br />
            <h4>Chores Ordered</h4>
            <table className='table'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
              {cart ? cart.map(i=>
                <tr>
                <td>{i.item}</td>
                <td>${i.price}</td>
              </tr>
              ) : null}
              </tbody>
            </table>
          </div>
        </div>
        <div className='row pt-2'>
          <div className='col-8 p-2 bg-light text-center'>
            <p>
              When you place an order, we will begin searching for a provider
              immediately! You will receive an email if we cannot find a match.
            </p>
            <button className='btn btn-warning' onClick={finalizeCheckout}>Place Order</button>
          </div>
          <div className='col-4 p-2 bg-light text-center'>
            <p className='font-weight-bold'>Payment Details</p>
            <small>Default Payment Method</small>
          </div>
        </div>
        {alert ? <div className='alert alert-warning mt-2'>{alert}</div> : null}
      </div>
      
    </div>
  );
};

export default Checkout;
