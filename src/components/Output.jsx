import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QrResult from "./QrResult";

const Output = () => {
  const bank = useSelector((state) => state.bank);
  const location = useLocation();
  const data = location.state; // Accessing the state

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <QrResult type='Default' qrM="circle" />
      <QrResult
      type='Square'
        ec="H"
        outerM="#35374B"
        outerR={[10, 0,0, 10]}
        innerR={[10, 0,0,0]}
        innerM="#344955"
        qrbox="square"
        qrM="circle"
        colorM="#78A083"
      />
      <QrResult
      type='Gol Gol'
        ec="Q"
        outerM="red"
        outerR={[20, 20, 20, 20]}
        innerR={[10, 10, 10, 10]}
        innerM="blue"
        qrbox="dots"
        qrM="circle"
        colorM="#23a646"
      />
      
      <QrResult />
    </div>
  );
};

export default Output;
