import React, { useContext } from 'react';
import UserContext from '../UserContext';
import ChoredashApi from './../api/ChoredashApi';
import CartItem from './CartItem';

const CartItems = () => {
  const { cart, setCart, currentUser } = useContext(UserContext);

  async function removeFromCart(e, itemCode) {
    e.preventDefault();
    console.log('removing from cart:', itemCode);
    let cartResponse = await ChoredashApi.removeFromCart(currentUser.id, itemCode);
    setCart(cartResponse);
  }

  return (
    <div>
      {cart && cart.length > 0 ? (
        <ul className='list-group'>
          {cart.map(item => (
            <CartItem chore={item} remove={removeFromCart} />
          ))}
        </ul>
      ) : (
        <div>No items in cart</div>
      )}
    </div>
  );
};

export default CartItems;
