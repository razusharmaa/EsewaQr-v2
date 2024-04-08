import React, { useState, useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo"; // Import from react-qrcode-logo
import html2canvas from "html2canvas";
import { useSelector, useDispatch } from "react-redux";
import { setBank, clearField } from "../features/bankMode/bankSlice";
import { useNavigate } from "react-router-dom";
import { Card, Dropdown } from "flowbite-react";

export default function QrResult() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const Bank = useSelector((state) => state.bank);
  const [download, setDownload] = useState("Download Qr");
  const qrRef = useRef(null);

  const qrData = JSON.parse(Bank.decodedCode);
  const Bankname = Bank.SelectedBank;
  const numberInt = parseInt(qrData.eSewa_id);
  let name = qrData.name;

  const back = () => {
    navigate(-1);
  };

  const downloadQR = () => {
    setDownload("Downloading...");
    if (qrRef.current) {
      // Increase the scale for a higher resolution output
      html2canvas(qrRef.current, { scale: 4 }).then((canvas) => {
        // Use canvas.toDataURL with 'image/png' for better quality
        const link = document.createElement("a");
        link.download = `${Bankname}QR-${name}.png`; // Save as .png instead of .jpg
        link.href = canvas.toDataURL("image/png", 1.0); // Set the quality to 1.0 for maximum quality
        link.click();
      });
    }
    setTimeout(() => {
      setDownload("Download Qr");
    }, 1000);
  };

  return (
    <Card className="max-w-sm dark:bg-white text-black">
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              onClick={downloadQR}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Download
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center pb-10">
        {qrData && (
          <QRCode
            value={qrData}
            size={256} // Increased size for better scannability
            ecLevel="Q" // Higher error correction level
            logoImage={`/images/esewaC.png`}
            logoWidth={40} // Reduced logo size
            logoHeight={40}
            removeQrCodeBehindLogo={true}
            eyeRadius={{ outer: [10, 10, 0, 0], inner: [5, 5, 0, 0] }} // Customize the corner radius
            eyeColor={{ outer: "#000000", inner: "#FF0000" }} // Customize the eye colors
            fgColor="#23a646" // Set the foreground color to red
            // bgColor="#FFFF00"
            qrStyle="squares"
            logoPaddingStyle="circle"
          />
        )}

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Bonnie Green
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Visual Designer
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Add friend
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </a>
        </div>
      </div>
    </Card>
  );
}
