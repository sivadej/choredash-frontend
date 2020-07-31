import React, { useContext } from 'react';
import UserContext from './../UserContext';

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 p-2 bg-info text-white text-center'>
          <h4>New order request incoming!</h4>
          <p>Approx. 12 minutes away</p>
          <p>Order total $38.00</p>
          <button className='btn btn-success'>Accept</button>{' '}
          <button className='btn btn-danger'>Reject</button>
        </div>
      </div>

      <div className='row pt-2'>
        <div className='col-8 p-2 bg-light text-center'>
          <h5>You have an order in progress</h5>
          <p>Address: 1201 W 82nd Ave </p>
          <button className='btn btn-warning'>I'm Done!</button>
        </div>
        <div className='col-4 p-2 bg-light text-center'>
          <p>Current order detail</p>
          <p>Chores:<br/>Chore 1<br/>Chore 2</p>
        </div>
      </div>

      <div className='row pt-2'>
        <div className='col-12 p-2 bg-light text-center'>
          <h5>Currently no active orders</h5>
        </div>
      </div>

      <div className='row pt-2'>
        <div className='bg-secondary text-white col-12 pt-2 col-md-3'>
          <h4>Sales</h4>
          <p>Total: $1,420.69</p>
        </div>
        <div className='col-12 bg-light col-md-9'>
          <br />
          <h4>Past Orders</h4>
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2020-07-31</td>
                <td>$19</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>2020-07-30</td>
                <td>$25</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>2020-07-25</td>
                <td>$37</td>
                <td>Completed</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
