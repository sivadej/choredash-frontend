import React from 'react';
import ChoreCard from './ChoreCard';

function CardList({ cards = [], addToOrder = () => null }) {
  return cards.length ? (
    <div className='CardList'>
      {cards.map((cardData, idx) => (
        <ChoreCard
          chore={cardData}
          key={idx}
          idx={idx}
          addToOrder={addToOrder}
        />
      ))}
    </div>
  ) : (
    <p className='lead'>Sorry, no results were found!</p>
  );
}

export default CardList;