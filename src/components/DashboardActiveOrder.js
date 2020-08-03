import React from 'react';

const DashboardActiveOrder = ({ complete, orderData }) => {
  return (
    <div className='row pt-2'>
      <div className='col-8 p-2 bg-light text-center'>
        <h5>You have an order in progress!</h5>
        {orderData ? (
          <div>
            <small>
              {orderData.customer_address.line1}
              <br />
              {orderData.customer_address.line2}
              <br />
              {orderData.customer_address.city}
              {', '}
              {orderData.customer_address.state}{' '}
              {orderData.customer_address.zip}
              <br />
            </small>
            <strong>About {orderData.est_travel_time} away</strong>
            <br />
            Approx work time: {orderData.est_work_time} minutes
          </div>
        ) : (
          <div className='spinner-border'></div>
        )}
      </div>
      <div className='col-4 p-2 bg-light text-center'>
        <p>
          <strong>
            Chores:
            <br />
          </strong>
          {orderData
            ? orderData.items.map((i) => (
                <span>
                  {i.item}
                  <br />
                </span>
              ))
            : null}
        </p>
        <button className='btn btn-warning' onClick={complete}>
          I'm Done!
        </button>
      </div>
    </div>
  );
};

export default DashboardActiveOrder;
