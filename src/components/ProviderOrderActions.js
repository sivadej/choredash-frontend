import React from 'react'

const ProviderOrderActions = ({orderId}) => {

  const clickAccept = (e) => {
    e.preventDefault();
    console.log('clicked accept');


  }

  const clickReject = (e) => {
    e.preventDefault();
    console.log('clicked accept');

    
  }

  return (
    <div>
      provider order action component for {JSON.stringify(orderId)}
      <button onClick={clickAccept}>Accept</button>
      <button onClick={clickReject}>Reject</button>
    </div>
  )
}

export default ProviderOrderActions
