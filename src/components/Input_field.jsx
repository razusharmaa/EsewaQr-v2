import React, { useState, useEffect } from "react";
import Manual_Input from "./Manual_Input";
import QrcodeDecoder from "qrcode-decoder";
import { FileInput, Label } from "flowbite-react";
import { setAlert } from "../features/alert/alertSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBank } from "../features/bankMode/bankSlice";

const Input_field = () => {
  const dispatch = useDispatch();
  const Bank = useSelector((state) => state.bank);
  let navigate = useNavigate();
  let qr = new QrcodeDecoder();
  const [qrResult, setQrResult] = useState(null);

  function resultQR() {
    const dataToSend = { "decoded code": qrResult };
    dispatch(setBank({ decodedCode: qrResult }));
    if (Bank.SelectedBank === "Esewa") {
      navigate("/output_E");
    } else {
      navigate("/output_K");
    }
  }

  useEffect(() => {
    if (qrResult) {
      resultQR();
    }
  }, [qrResult]);

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    if (!file) {
      dispatch(setAlert({ message: "File not found", type: "warning" }));
      return;
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      dispatch(setAlert({ message: "File is not an image", type: "warning" }));
      return;
    }

    let reader = new FileReader();
    reader.onload = (event) => {
      dispatch(setAlert({ message: "File loaded", type: "success" }));
      console.log("File loaded", event.target.result);
      qr.decodeFromImage(event.target.result)
        .then((res) => {
          console.log("QR decode result", res);
          try {
            const resultData = JSON.parse(res.data);
            if (
              (Bank.SelectedBank === "Esewa" && resultData && resultData.eSewa_id && resultData.name) ||
              (Bank.SelectedBank !== "Esewa" && resultData && resultData.Khalti_ID && resultData.name)
            ) {
              setQrResult(res.data);
              
            } else {
              dispatch(
                setAlert({
                  message: `Uploaded QR code is not of ${Bank.SelectedBank}`,
                  type: "warning",
                })
              );
            }
          } catch (err) {
            dispatch(
              setAlert({
                message: "QR decode error: " + err.message,
                type: "failure",
              })
            );
            console.log("QR decode error", err);
          }
        })

        .catch((err) => {
          dispatch(
            setAlert({
              message: "QR decode error: " + err.message,
              type: "failure",
            })
          );
          
        });
    };
    reader.onerror = (err) => {
      dispatch(
        setAlert({ message: "File read error:" + err, type: "failure" })
      );
      
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="px-3 my-1 flex flex-col w-full items-center justify-center">
        <p className="py-1 text-xl font-mono font-medium">
          Upload your Qr code here
        </p>
        <Label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            onChange={handleFileChange}
          />
        </Label>
        {qrResult && <p>Decoded QR code: {qrResult}</p>}

        <Manual_Input />
      </div>
    </>
  );
};

export default Input_field;
