import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import ChoredashApi from './../api/ChoredashApi';
import './Card.scss';

const ChoreCard = ({ chore = {} }) => {
  const { item_code, description, item, est_time, price, category, img_url } = chore;
  const { cart, setCart, currentUser } = useContext(UserContext);

  // create hash set of cart items for conditional button render
  const itemSet = new Set();
  if (Array.isArray(cart)) cart.forEach(i=>itemSet.add(i.item_code));

  async function addToOrder(e) {
    e.preventDefault();
    let cartResponse = await ChoredashApi.addToCart(currentUser.id, chore);
    setCart(cartResponse);
  }

  const activeButton = () => (
    <div>
      <button
        className='btn btn-sm btn-danger font-weight-bold text-uppercase float-right'
        onClick={addToOrder}
        disabled={false}>
        Add to Order - ${price}
      </button>
    </div>
  );

  const disabledButton = () => (
    <div>
      <button
        className='btn btn-sm btn-secondary font-weight-bold text-uppercase float-right'
        disabled={true}>
        In Your Cart - ${price}
      </button>
    </div>
  );

  return (
    <Link className='Card card' to={`/chores/${item_code}`}>
      { img_url ? <img className='card-img-top' src={`${img_url}`} alt={`${item_code}`}/> : null}
      <div className='card-body'>
        
        <h5 className='card-title d-flex justify-content-between'>
          <span className='text-capitalize'>{item}</span>
        </h5>
        <p>{description}</p>
        <small>Est. {est_time} Minutes | Category: {category}</small>
        <div>{itemSet.has(item_code) ? disabledButton() : activeButton() }</div>
      </div>
    </Link>
  );
};

export default ChoreCard;

//est_time, price, category