// CUSTOMER OrderDetail component

import React, { useEffect, useState, useContext } from 'react';
import UserContext from './../UserContext';
import { useParams } from 'react-router-dom';
import ChoredashApi from './../api/ChoredashApi';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function getOrder() {
      let order = await ChoredashApi.getOrderDetail(orderId);
      setOrder(order);
    }
    getOrder();
  }, [orderId]);

  return (
    <div>
      <div className='container'>
        <div className='row pt-2'>
          <div className='col-12 p-2 bg-info text-center text-white'>
            <h5>Order Details</h5>
          </div>
        </div>
        <div className='row pt-2'>
          <div className='bg-secondary text-white col-12 pt-2 pb-2 col-md-3'>
            <h4>Total</h4>
            <h6>$ {order ? order.order_total : null}</h6>
            <hr />
            <h5>Address</h5>
            {order ? (
              <small>
                {order.customer_address.line1}
                <br />
                {order.customer_address.line2}
                <br />
                {order.customer_address.city}
                {', '}
                {order.customer_address.state}{' '}
                {order.customer_address.zip}
                <br />
              </small>
            ) : (
              <div class='spinner-border'></div>
            )}
            <hr />
            <p className='font-weight-bold'>Payment Details</p>
            <small>Default Payment Method</small>
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
                {order
                  ? order.items.map((i) => (
                      <tr>
                        <td>{i.item}</td>
                        <td>${i.price}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            <hr />
            {order ? (
              <p>
                <strong>Status: </strong>{order.status}
                <br />
                <strong>Created: </strong>{new Date(order.date_created).toLocaleDateString()}
                <br />
                <strong>Completed: </strong>{new Date(order.date_completed).toLocaleDateString()}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

//{new Date(o.date_created).toLocaleDateString()}
