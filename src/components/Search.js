import React, { useState } from 'react';
import './Search.scss';

function Search({ searchFor }) {
  const [search, setSearch] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(search);
  }

  function handleChange(evt) {
    setSearch(evt.target.value);
  }

  return (
    <div className='Search mb-4'>
      <form className='form-inline' onSubmit={handleSubmit}>
        <input
          className='form-control form-control-md flex-grow-1'
          name='search'
          placeholder='Search...'
          value={search}
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-md btn-warning'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Search;
