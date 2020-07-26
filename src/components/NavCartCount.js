import React, { useContext } from 'react';
import UserContext from './../UserContext';


const NavCartCount = () => {
  const { cart } = useContext(UserContext);
  const cartCount = (cart !== null) ? cart.length : 0;

  return (
    <div>
      Cart{cartCount && cartCount > 0 ? `(${cartCount})` : null}
    </div>
  )
}

export default NavCartCount;