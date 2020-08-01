import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './../UserContext';
import ChoredashApi from './../api/ChoredashApi';
import DashboardActiveOrder from './DashboardActiveOrder';
import DashboardIncoming from './DashboardIncoming';

const DashboardOrderAlert = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const clickAccept = async (e) => {
    e.preventDefault();
    await ChoredashApi.acceptOrder(pendingOrder.order_id, currentUser.id);
  };
  const clickReject = async (e) => {
    e.preventDefault();
    await ChoredashApi.rejectOrder(pendingOrder.order_id, currentUser.id);
  };
  const clickComplete = async (e) => {
    e.preventDefault();
    await ChoredashApi.completeOrder(pendingOrder.order_id);
    setPendingOrder(null);
    history.push('/dashboard');
  };

  useEffect(() => {
    async function getPendingOrder() {
      let pendingRes = await ChoredashApi.getPendingOrder(currentUser.id);
      setPendingOrder(pendingRes);
      if (pendingRes.order_id !== null) {
        let orderRes = await ChoredashApi.getOrderDetail(pendingRes.order_id);
        setOrderData(orderRes);
      }
    }
    getPendingOrder();

    const timer = setInterval(async () => {
      await getPendingOrder();
    }, 2000);
    return () => clearInterval(timer);
  }, [currentUser.id]);

  return (
    <div>
      {pendingOrder && pendingOrder.status === 'waiting' ? (
        <DashboardIncoming
          accept={clickAccept}
          reject={clickReject}
          orderData={orderData}
        />
      ) : null}
      {pendingOrder && pendingOrder.status === 'order_in_progress' ? (
        <DashboardActiveOrder complete={clickComplete} orderData={orderData} />
      ) : null}
      {pendingOrder && !pendingOrder.status ? (
        <div className='row pt-2'>
          <div className='col-12 p-2 bg-light text-center'>
            <h5>Currently no active orders</h5>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardOrderAlert;
