import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Dropdown } from "flowbite-react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import { IMAGES } from "../images/Images";

export default function QrResult(props) {
  let {
    ec,
    outerM,
    innerM,
    qrbox,
    qrM,
    colorM,
    colorMb,
    outerR,
    innerR,
    type,
    tleO,
    tleI,
    treO,
    treI,
    tbeO,
    tbeI,
    clO,
    clI,
    crO,
    crI,
    cbO,
    cbI,
  } = props;
  const [qrQ, setqrQ] = useState(ec);

  const changeQ = (T) => {
    setqrQ(T);
  };

  // Hooks for navigation and accessing Redux store
  const navigate = useNavigate();
  const Bank = useSelector((state) => state.bank);

  // Ref for the QR code element
  const qrRef = useRef();

  // Extracting user info from the bank state
  const userInfo = JSON.parse(Bank.decodedCode || "{}");
  const { SelectedBank: bankName, eSewa_id, name } = userInfo;

  // Function to download the QR code as an image
  const downloadQR = async () => {
    if (qrRef.current) {
      const canvas = await html2canvas(qrRef.current, {
        scale: 3, // Adjust scale for better quality
        useCORS: true, // For images hosted across domains
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${bankName}QR-${name}.png`;
      link.href = image;
      link.click();
    }
  };

  return (
    <Card className="min-w-72 max-w-sm dark:bg-white text-black">
      <div className="flex justify-between	 px-4 pt-4">
        <p className="text-2xl font-bold text-gray-900  ">{type}</p>
        <Dropdown inline label="">
          <Dropdown.Item>
            <a
              onClick={() => changeQ("M")}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Low
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              onClick={() => changeQ("Q")}
              className="block px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Medium
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              onClick={() => changeQ("H")}
              className="block px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              High
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>

      <div ref={qrRef} className="flex flex-col items-center pb-10">
        {/* Render QR code only if qrData is available */}
        {Bank.decodedCode && (
          <QRCode
            // Include radius for the inner eye of the top/left eye
            {...(tleO && treO && tbeO
              ? {
                  eyeRadius: [
                    {
                      // top/left eye
                      outer: tleO,
                      inner: tleI,
                    },
                    {
                      // top/right eye
                      outer: treO,
                      inner: treI,
                    },
                    {
                      // bottom/left
                      outer: tbeO,
                      inner: tbeI,
                    },
                  ],
                }
              : {})}
            {...(clO && crO && cbO
              ? {
                  eyeColor: [
                    {
                      // top/left eye
                      outer: clO,
                      inner: clI,
                    },
                    {
                      // top/right eye
                      outer: crO,
                      inner: crI,
                    },
                    {
                      // bottom/left
                      outer: cbO,
                      inner: cbI,
                    },
                  ],
                }
              : {})}
            value={Bank.decodedCode}
            size={256} // Smaller size for display
            {...(qrQ ? { ecLevel: qrQ } : {})}
            logoImage={IMAGES.QRc_esewa}
            logoWidth={40}
            logoHeight={40}
            removeQrCodeBehindLogo={true}
            {...(innerR || outerR
              ? { eyeRadius: { outer: outerR, inner: innerR } }
              : {})}
            {...(innerM || outerM
              ? { eyeColor: { outer: outerM, inner: innerM } }
              : {})}
            {...(colorM ? { fgColor: colorM } : {})}
            {...(colorMb ? { bgColor: colorMb } : {})}
            {...(qrbox ? { qrStyle: qrbox } : {})}
            {...(qrM ? { logoPaddingStyle: "circle" } : {})}
          />
        )}
        <img
          src={IMAGES.esewaLogo} 
          alt="eSewa Logo"
          className="h-14 object-contain my-3"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{name}</h5>
        <span className="text-base text-gray-700">{eSewa_id}</span>
        <span className="text-sm text-gray-500 my-2">
          Scan QR code to receive money
        </span>
      </div>
      <div className="w-full flex justify-center gap-4">
        <button
          onClick={() => navigate("/edit")}
          className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Edit
        </button>
        <button
          onClick={downloadQR}
          className="cursor-pointer inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Download
        </button>
      </div>
    </Card>
  );
}
