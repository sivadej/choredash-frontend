import React from 'react';

const CartItems = ({ items }) => {
  return (
    <div>
      {items ? (
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>{item.itemcode} {item.description} {item.price}</li>
          ))}
        </ul>
      ) : (
        <div>No items in cart</div>
      )}
    </div>
  );
};

export default CartItems;