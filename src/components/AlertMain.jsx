import React, { useEffect } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoIosWarning } from "react-icons/io";
import { Alert } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../features/alert/alertSlice";

const AlertMain = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const ICONS = {
    info: HiInformationCircle,
    success: FaCheckCircle,
    failure: ImCross,
    warning: IoIosWarning,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert.message]);

  return (
    <>
      {alert.message && (
        <Alert color={alert.type} icon={ICONS[alert.type]}>
          <span className="font-medium">{alert.type} alert!</span>{" "}
          {alert.message}
        </Alert>
      )}
    </>
  );
};

export default AlertMain;
