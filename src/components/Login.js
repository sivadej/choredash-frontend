import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import Alert from './Alert';
import ChoredashApi from './../api/ChoredashApi';

function Login({ setToken, userType }) {
  const history = useHistory();
  const [activeView, setActiveView] = useState('login');
  const [loginInfo, setLoginInfo] = useState({
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip: '',
    errors: [],
  });

  function setLoginView() {
    setActiveView('login');
  }

  function setSignupView() {
    setActiveView('signup');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let data;
    let endpoint;

    if (activeView === 'signup') {
      data = {
        email: loginInfo.email,
        password: loginInfo.password,
        first_name: loginInfo.first_name,
        last_name: loginInfo.last_name,
        address_line1: loginInfo.address_line1,
        address_line2: loginInfo.address_line2,
        city: loginInfo.city,
        state: loginInfo.state,
        zip: loginInfo.zip,
        userType,
      };
      endpoint = 'register';
    } else {
      data = {
        email: loginInfo.email,
        password: loginInfo.password,
        userType,
      };
      endpoint = 'login';
    }

    let res;

    try {
      res = await ChoredashApi[endpoint](data);
      if (res.message)
        return setLoginInfo((l) => ({ ...l, errors: [res.message] }));
      if (res._token) {
        setToken(res._token);
        history.push('/');
      }
    } catch (errors) {
      return setLoginInfo((l) => ({ ...l, errors }));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo((l) => ({ ...l, [name]: value }));
  }

  let loginActive = activeView === 'login';

  const signupFields = (
    <div>
      <div className='form-group'>
        <label>First Name</label>
        <input
          name='first_name'
          className='form-control'
          value={loginInfo.first_name}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Last Name</label>
        <input
          name='last_name'
          className='form-control'
          value={loginInfo.last_name}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Address Line 1</label>
        <input
          name='address_line1'
          className='form-control'
          value={loginInfo.address_line1}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Address Line 2</label>
        <input
          name='address_line2'
          className='form-control'
          value={loginInfo.address_line2}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>City</label>
        <input
          name='city'
          className='form-control'
          value={loginInfo.city}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>State</label>
        <input
          name='state'
          className='form-control'
          value={loginInfo.state}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>ZIP</label>
        <input
          name='zip'
          className='form-control'
          value={loginInfo.zip}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  return (
    <div className='Login'>
      <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
        <div className='d-flex justify-content-end'>
          <div className='btn-group'>
            <button
              className={`btn btn-warning ${loginActive ? 'active' : ''} `}
              onClick={setLoginView}>
              Login {userType}
            </button>
            <button
              className={`btn btn-warning ${loginActive ? '' : 'active'} `}
              onClick={setSignupView}>
              Sign up
            </button>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  value={loginInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  value={loginInfo.password}
                  onChange={handleChange}
                />
              </div>

              {loginActive ? (
                <div>
                  <small>
                    <strong>Demo Account</strong>
                    <br />
                    Email: demo@test.com - Password: test123
                  </small>
                </div>
              ) : (
                signupFields
              )}
              {loginInfo.errors.length ? (
                <Alert type='danger' messages={loginInfo.errors} />
              ) : null}

              <button
                type='submit'
                className='btn btn-warning float-right'
                onSubmit={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
