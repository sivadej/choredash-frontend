import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

const ChoreCard = ({ chore = {}, addToOrder }) => {
  const { item_code, description, item } = chore;

  return (
    <Link className='Card card' to={`/chores/${item_code}`}>
      <div className='card-body'>
        <h6 className='card-title d-flex justify-content-between'>
          <span className='text-capitalize'>{item}</span>
        </h6>
        <p>{description}</p>
        <button
          className='btn btn-danger font-weight-bold text-uppercase float-right'
          onClick={addToOrder}
          disabled={item.state}>
          {item.state ? 'Remove from Order' : 'Add to Order'}
        </button>
      </div>
    </Link>
  );
};

export default ChoreCard;
