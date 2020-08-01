import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.scss';
import UserContext from '../UserContext';
import NavCartCount from './NavCartCount';

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  function customerNav() {
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
            <NavCartCount />
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

  function providerNav() {
    return (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item mr-2'>
          <NavLink className='nav-link' to='/dashboard'>
            Provider Dashboard
          </NavLink>
        </li>
        <li className='nav-item mr-2'>
          <NavLink className='nav-link' to='/profile'>
            Profile
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

  function adminOptions() {
    return (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item mr-2'>
          <NavLink className='nav-link' to='/orders'>
            Admin Dashboard
          </NavLink>
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
    <nav className='Navigation navbar navbar-expand-md navbar-light bg-light'>
      <Link className='navbar-brand font-weight-bold' to={'/'}>
        ChoreDash
      </Link>
      <button
        class='custom-toggler navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarsExample09'
        aria-controls='navbarsExample09'
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label='Toggle navigation'
        onClick={handleNavCollapse}>
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
      {currentUser && currentUser.is_admin ? adminOptions() : null}
      {currentUser && currentUser.type === 'customer' ? customerNav() : null}
      {currentUser && currentUser.type === 'provider' ? providerNav() : null}
      {!currentUser ? loggedOutNav() : null}
      </div>
    </nav>
  );

  // return (
  //   <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
  //     <a class="navbar-brand text-info font-weight-bolder" href="/">
  //       <span className="">Discounter</span>
  //     </a>
  //     <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
  //       <span class="navbar-toggler-icon"></span>
  //     </button>

  //     <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
  //       <a className="nav-link text-info" href="/contact">Support</a>
  //       <a className="nav-link text-info" href="/login">Login</a>
  //       <a href="/request-demo" className="btn btn-sm btn-info nav-link text-white" >Request demo</a>
  //     </div>
  //   </nav>
  // );
}

export default Navigation;
