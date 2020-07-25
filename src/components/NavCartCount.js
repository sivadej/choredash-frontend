import React, { useContext } from 'react';
import UserContext from './../UserContext';

const NavCartCount = () => {
  const { cart } = useContext(UserContext);
  console.log(cart)
  const cartCount = cart.length;

  return (
    <div>
      Cart{cartCount && cartCount > 0 ? `(${cartCount})` : null}
    </div>
  )
}

export default NavCartCount;