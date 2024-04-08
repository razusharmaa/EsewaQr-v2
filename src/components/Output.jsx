import React from 'react'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QrResult from './QrResult';

const Output = () => {
  const bank = useSelector((state) => state.bank)
  const location = useLocation();
  const data = location.state; // Accessing the state

  return (
    <div>
      <QrResult/>
    </div>
  )
}

export default Output;
