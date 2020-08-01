import React from 'react';
import { Link } from 'react-router-dom';

const OrdersList = ({orders}) => {
  return (
    <div className='container'>
      <div className='row pt-2'>
        <div className='col-12 bg-light'>
          <br />
          <h4>Order History</h4>
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Chores</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders
                ? orders.map((o) => (
                    <tr key={o._id}>
                      <td><Link to={`/order-details/${o._id}`}>{new Date(o.date_created).toLocaleDateString()}</Link></td>
                      <td>{o.items.length}</td>
                      <td>${o.order_total}</td>
                      <td>
                        <button className='btn btn-sm btn-secondary'>
                          {o.status}
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrdersList
