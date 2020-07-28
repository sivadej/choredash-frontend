import React, { useContext } from 'react';
import UserContext from './../UserContext';
import CartItems from './CartItems';
import { Link } from 'react-router-dom';

const Cart = ({calculateCartTotal}) => {
  const { cart } = useContext(UserContext);

  const checkout = () => {
    return (
      <div>
        <p>Total: {calculateCartTotal()}</p>
        <Link to='/checkout'>
          Checkout
        </Link>
      </div>
    );
  }



  return (
    <div>
      <h4>Cart</h4>
      <div><CartItems items={cart}/></div>
      <div>{cart && cart.length > 0 ? checkout() : null}</div>
    </div>
  );
};

export default Cart;