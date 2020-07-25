import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import CartItems from './CartItems';
import ChoredashApi from './../api/ChoredashApi';

const Cart = () => {
  const { currentUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    async function getCartItems() {
      let items = await ChoredashApi.getCart(currentUser.id);
      setCartItems(items);
    }
    getCartItems();
  }, [currentUser.id]);

  const changeItem = () => {
    return;
  }

  return (
    <div>
      <h4>Cart for {currentUser.firstName}</h4>
      <div><CartItems items={cartItems} changeItem={changeItem}/></div>
      <div>{JSON.stringify(cartItems)}</div>
    </div>
  );
};

export default Cart;