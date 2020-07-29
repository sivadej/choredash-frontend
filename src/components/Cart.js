import React, { useContext } from 'react';
import UserContext from './../UserContext';
import CartItems from './CartItems';
import { Link } from 'react-router-dom';

const Cart = ({calculateCartTotal}) => {
  const { cart } = useContext(UserContext);

  const checkout = () => {
    return (
      <div className='font-weight-bold'>
        <h5>Total: {calculateCartTotal()}</h5>
        <Link to='/checkout'>
          <h5>Checkout</h5>
        </Link>
      </div>
    );
  }

  return (
    <div className='col-md-8 col-lg-6 offset-md-2 offset-lg-3'>
      <h4>Cart</h4>
      <ul className='list-group'>
        <CartItems items={cart}/>
        <li className='list-group-item d-flex'>
          {cart && cart.length > 0 ? checkout() : null}
        </li>
      </ul>
      
    </div>
  );
};

export default Cart;