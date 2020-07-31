import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import Search from './Search';
import ChoredashApi from './../api/ChoredashApi';

function Chores() {
  const [chores, setChores] = useState([]);

  useEffect(() => {
    async function getChores() {
      let chores = await ChoredashApi.getChores();
      setChores(chores);
    }
    getChores();
  }, []);

  async function handleSearch(search) {
    let chores = await ChoredashApi.getChores(search);
    setChores(chores);
  }

  async function addToOrder() {
    return;
  }

  return (
    <div className='container'>
      <div className='col-md-10 offset-md-1'>
        <Search endpoint='chores' searchFor={handleSearch} />
        <CardList cards={chores} addToOrder={addToOrder}/>
      </div>
    </div>
  );
}

export default Chores;
