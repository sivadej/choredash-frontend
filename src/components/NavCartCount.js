import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import ChoredashApi from './../api/ChoredashApi';

const NavCartCount = () => {
  const { currentUser } = useContext(UserContext);
  const [cartCount, setCartCount] = useState(null);
  const { id } = currentUser;

  useEffect(() => {
    async function getCartItems() {
      let items = await ChoredashApi.getCart(id);
      setCartCount(items.length);
    }
    getCartItems();
  }, [id]);

  return (
    <div>
      Cart{cartCount && cartCount > 0 ? `(${cartCount})` : null}
    </div>
  )
}

export default NavCartCount;