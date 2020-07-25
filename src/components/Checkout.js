import React, { useContext } from 'react';
import UserContext from './../UserContext';

const Checkout = () => {
  const { cart } = useContext(UserContext);
  return (
    <div>
      checkout component {JSON.stringify(cart)}
    </div>
  )
}

export default Checkout;