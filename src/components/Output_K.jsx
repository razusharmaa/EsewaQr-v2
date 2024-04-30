import React from "react";
import { useLocation } from "react-router-dom";
import {useSelector } from "react-redux";
import QrResult_khalti from "./QrResult_khalti";

const Output_K = () => {
  const bank = useSelector((state) => state.bank);
  const location = useLocation();
  const data = location.state; // Accessing the state

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <QrResult_khalti type="Default" qrM="circle" />

      <QrResult_khalti
        type="Classic"
        tleO={[10, 10, 0, 10]}
        tleI={[10, 10, 0, 10]}
        treO={[10, 10, 10, 0]}
        treI={[10, 10, 10, 0]}
        tbeO={[10, 0, 10, 10]}
        tbeI={[10, 0, 10, 10]}
        ec="Q"
        outerM="#390266"
        innerM="#db9302"
        colorM="#191A19"
        qrM="circle"
      />

      <QrResult_khalti
        type="Gol Gol"
        ec="Q"
        outerM="#27005D"
        outerR={[20, 20, 20, 20]}
        innerR={[10, 10, 10, 10]}
        innerM="#9400FF"
        qrbox="dots"
        qrM="circle"
        colorM="#211951"
      />
      <QrResult_khalti
        type="Square"
        ec="H"
        outerM="#8e11ed"
        innerM="#c99deb"
        colorM="#191A19"
        outerR={[10, 0, 0, 10]}
        innerR={[10, 0, 0, 0]}
        qrbox="fluid"
        qrM="circle"
      />
      <QrResult_khalti
      type='Boaring'
        clO="red"
        clI="blue"
        cbO="green"
        cbI="yellow"
        crO="pink"
        crI="skyblue"
      />
    </div>
  );
};

export default Output_K;
