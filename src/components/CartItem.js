import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({chore, remove}) => {
  const { item_code, item, price } = chore;

  return (
      <li className='list-group-item d-flex' key={item_code}>
        <div className='flex-grow-1'>
          <Link to={`/chores/${item_code}`}>{item}</Link>
        </div>
        <div className='d-flex justify-content-end'>{price} 
          <button className='badge badge-danger ml-2' onClick={(e)=>remove(e,item_code)}>X</button>
        </div>
      </li>
  )
}

export default CartItem;