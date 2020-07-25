import React from 'react';
import { Link } from 'react-router-dom';

function Card({ chore = {} }) {
  const { item_code, description, item } = chore;

  return (
    <Link className='Card card' to={`/chores/${item_code}`}>
      <div className='card-body'>
        <h6 className='card-title d-flex justify-content-between'>
          <span className='text-capitalize'>{item}</span>
        </h6>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default Card;
