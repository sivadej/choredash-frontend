import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
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
  const [cart, setCart] = useState([]);

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let decodedToken = decode(token);
        setCurrentUser(decodedToken);
        if (decodedToken.id) getCart(decodedToken.id);
      } catch (err) {
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }
    async function getCart(id) {
      try {
        let items = await ChoredashApi.getCart(id);
        setCart(items);
      } catch (err) {
        setCurrentUser(null);
      }
    }
    getCurrentUser();
  }, [token]);

  const handleLogOut = () => {
    setCurrentUser(null);
    setCart(null);
    setToken(null);
  };

  if (!infoLoaded) {
    return <ClipLoader size={150} color='#123abc' />;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, cart, setCart }}>
        <div className='App'>
          <Navigation logout={handleLogOut} />
          <Routes setToken={setToken} />
        </div>
        <hr/>
        <div>current user: {JSON.stringify(currentUser)}</div>
        <div>global cart: {JSON.stringify(cart)}</div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
