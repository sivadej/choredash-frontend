import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChoredashApi from './../api/ChoredashApi';
import ChoreCard from './ChoreCard';

const ChoreDetail = () => {
  const { itemcode } = useParams();
  const [chore, setChore] = useState(null);

  useEffect(() => {
    async function getChore(itemcode) {
      let chore = await ChoredashApi.getChoreByCode(itemcode);
      setChore(chore);
    }

    getChore(itemcode);
  }, [itemcode]);

  return (
    <div className='container'>
      <div className='col-md-10 offset-md-1'>
        {chore ? <ChoreCard chore={chore} /> : null}
      </div>
    </div>
  );
};

export default ChoreDetail;
