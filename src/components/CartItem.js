import React from 'react'

const CartItem = ({chore, remove}) => {
  const { item_code, item, price } = chore;

  return (
      <li className='list-group-item' key={item_code}>
        {item} - {price} 
        - <button onClick={(e)=>remove(e,item_code)}>X</button>
      </li>
  )
}

export default CartItem;