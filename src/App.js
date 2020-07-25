import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import './App.scss';
import useLocalStorage from './hooks/useLocalStorage';
import Navigation from './components/Navigation';
import Routes from './routes/Routes';
import ChoredashApi from './api/ChoredashApi';
import UserContext from './UserContext';

export const TOKEN_STORAGE_ID = 'choredash-token';

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let response = await ChoredashApi.getUserByToken(token);
        setCurrentUser(response);
      } catch (err) {
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };

  if (!infoLoaded) {
    return <ClipLoader size={150} color='#123abc' />;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className='App'>
          <p>current user: {JSON.stringify(currentUser)}</p>
          <Navigation logout={handleLogOut} />
          <Routes setToken={setToken} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
