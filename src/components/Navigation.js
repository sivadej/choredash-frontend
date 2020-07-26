import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.scss';
import UserContext from '../UserContext';
import NavCartCount from './NavCartCount';

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.log('rendering navbar')

  function loggedInNav() {
    return (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item mr-2'>
          <NavLink className='nav-link' to='/chores'>
            Chores
          </NavLink>
        </li>
        <li className='nav-item mr-2'>
          <NavLink className='nav-link' to='/orders'>
            My Orders
          </NavLink>
        </li>
        <li className='nav-item mr-2'>
          <NavLink className='nav-link' to='/profile'>
            Profile
          </NavLink>
        </li>
        <li className='nav-item mr-2'>
          <NavLink className='nav-link' to='/cart'>
            <NavCartCount/>
          </NavLink>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/' onClick={logout}>
            Log out
          </Link>
        </li>
        <li className='nav-item nav-link tiny'>
          ({currentUser ? currentUser.firstName : null})
        </li>
        
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/login'>
            Login
          </NavLink>
        </li>
      </ul>
    );
  }

  // create navs for customer, provider, anon

  return (
    <nav className='Navigation navbar navbar-expand-md'>
      <Link className='navbar-brand' to={currentUser ? '/dashboard' : '/'}>
        ChoreDash
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
