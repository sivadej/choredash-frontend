import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import CartItems from './CartItems';
import ChoredashApi from './../api/ChoredashApi';

const Cart = () => {
  const { currentUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState(null);

  const { id, firstName } = currentUser;

  useEffect(() => {
    async function getCartItems() {
      let items = await ChoredashApi.getCart(id);
      setCartItems(items);
    }
    getCartItems();
  }, [id]);

  const changeItem = () => {
    return;
  }

  return (
    <div>
      <h4>Cart for {firstName}</h4>
      <div><CartItems items={cartItems} changeItem={changeItem}/></div>
      <div>{JSON.stringify(cartItems)}</div>
      <div>count {cartItems ? cartItems.length : 0}</div>
    </div>
  );
};

export default Cart;