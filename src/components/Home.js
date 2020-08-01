import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import UserContext from './../UserContext';

function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className='Home'>
      <div className='container text-center'>
        <h1 className='mb-4 font-weight-bold'>ChoreDash</h1>
        <h4 className='mb-4'>
          For the lazy at heart. Mundane tasks done for you.
        </h4>
        {currentUser ? (
          <h4 className='font-weight-bold'>Hello, {currentUser.firstName}!</h4>
        ) : (
          <div>
            <Link className='btn btn-warning font-weight-bold' to='/login'>
              Log in
            </Link>
            <Link className='btn btn-warning font-weight-bold ml-2' to='/chores'>
              Find Chores!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
