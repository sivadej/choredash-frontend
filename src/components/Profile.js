import React, { useState, useContext, useEffect, useRef } from 'react';
import Alert from './Alert';
import ChoredashApi from './../api/ChoredashApi';
import UserContext from './../UserContext';

const MESSAGE_SHOW_PERIOD_IN_MSEC = 3000;

function Profile({ setToken }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    email: currentUser.email || '',
    password: '',
    errors: [],
    saveConfirmed: false,
  });

  const messageShownRef = useRef(false);
  useEffect(
    function () {
      if (userForm.saveConfirmed && !messageShownRef.current) {
        messageShownRef.current = true;
        setTimeout(function () {
          setUserForm((f) => ({ ...f, saveConfirmed: false }));
          messageShownRef.current = false;
        }, MESSAGE_SHOW_PERIOD_IN_MSEC);
      }
    },
    [userForm]
  );

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      let profileData = {
        first_name: userForm.firstName || undefined,
        last_name: userForm.lastName || undefined,
        email: userForm.email || undefined,
      };

      let updatedUser = await ChoredashApi.saveProfile(currentUser.id, currentUser.type, profileData);

      // refresh login token
      const refreshLoginData = {email: profileData.email, password: userForm.password}
      const refreshToken = await ChoredashApi.login(refreshLoginData);
      if (refreshToken.message) setUserForm((f) => ({ ...f, errors:[refreshToken.message] }));
      if (refreshToken._token) setToken(refreshToken._token)

      setUserForm((f) => ({
        ...f,
        errors: [],
        saveConfirmed: true,
        password: '',
      }));
      setCurrentUser({
        ...currentUser,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        email: updatedUser.email,
      });
    } catch (errors) {
      setUserForm((f) => ({ ...f, errors }));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserForm((f) => ({
      ...f,
      [name]: value,
      errors: [],
    }));
  }

  return (
    <div className='col-md-6 col-lg-4 offset-md-3 offset-lg-4'>
      <h3>Profile</h3>
      <div className='card'>
        <div className='card-body'>
          <form>
            <div className='form-group'>
              <label>First Name</label>
              <input
                name='firstName'
                className='form-control'
                value={userForm.firstName}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Last Name</label>
              <input
                name='lastName'
                className='form-control'
                value={userForm.lastName}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                name='email'
                className='form-control'
                value={userForm.email}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Enter password to confirm changes:</label>
              <input
                type='password'
                name='password'
                className='form-control'
                value={userForm.password}
                onChange={handleChange}
              />
            </div>

            {userForm.errors.length ? (
              <Alert type='danger' messages={userForm.errors} />
            ) : null}

            {userForm.saveConfirmed ? (
              <Alert type='success' messages={['User updated!']} />
            ) : null}

            <button
              className='btn btn-primary btn-block mt-4'
              onClick={handleSubmit}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
