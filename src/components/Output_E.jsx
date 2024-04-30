import React from "react";
import { useLocation } from "react-router-dom";
import {useSelector } from "react-redux";
import QrResult_esewa from "./QrResult_esewa";

const Output_E = () => {
  const bank = useSelector((state) => state.bank);
  const location = useLocation();
  const data = location.state; // Accessing the state

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <QrResult_esewa type="Default" qrM="circle" />

      <QrResult_esewa
        type="Classic"
        tleO={[10, 10, 0, 10]}
        tleI={[10, 10, 0, 10]}
        treO={[10, 10, 10, 0]}
        treI={[10, 10, 10, 0]}
        tbeO={[10, 0, 10, 10]}
        tbeI={[10, 0, 10, 10]}
        ec="Q"
        outerM="#1E5128"
        innerM="#4E9F3D"
        colorM="#191A19"
        qrM="circle"
      />

      <QrResult_esewa
        type="Gol Gol"
        ec="Q"
        outerM="#2C7865"
        outerR={[20, 20, 20, 20]}
        innerR={[10, 10, 10, 10]}
        innerM="#5DEBD7"
        qrbox="dots"
        qrM="circle"
        colorM="#23a646"
      />
      <QrResult_esewa
        type="Square"
        ec="H"
        outerM="#1E5128"
        innerM="#4E9F3D"
        colorM="#191A19"
        outerR={[10, 0, 0, 10]}
        innerR={[10, 0, 0, 0]}
        qrbox="fluid"
        qrM="circle"
      />
      <QrResult_esewa
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

export default Output_E;
