import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../UserContext';
import CartItems from './CartItems';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart } = useContext(UserContext);

  const changeItem = () => {
    return;
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log('click!');
    setCart([...cart, 'newitem']);
    //const response = api call for cart update, respond with new cart
    //setCart(response);
  }

  const clearCart = (e) => {
    e.preventDefault();
    console.log('clear!');
    setCart([]);
    //const response = api call for cart update, respond with new cart
    //setCart(response);
  }

  // refresh cart
  // always load cart data from Api to state to ensure 'single source of truth' on cart data

  const checkout = () => {
    return (
      <Link to='/checkout'>
        Checkout
      </Link>
    );
  }

  return (
    <div>
      <h4>Cart</h4>
      <div><CartItems items={cart} changeItem={changeItem}/></div>
      <div>cartItems state: {JSON.stringify(cart)}</div>
      <div>{cart && cart.length > 0 ? checkout() : null}</div>
      <button onClick={handleClick}>add to cart</button>
      <button onClick={clearCart}>empty</button>
    </div>
  );
};

export default Cart;