import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Dropdown } from "flowbite-react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import { IMAGES } from "../images/Images";
import domtoimage from "dom-to-image";
import rasterizeHTML from "rasterizehtml";

export default function QrResult_khalti(props) {
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
  const { Khalti_ID, name } = userInfo;

  // Function to download the QR code as an image
  const downloadQR = async () => {
    if (qrRef.current) {
      const canvas = await html2canvas(qrRef.current, {
        scale: 3, // Adjust scale for better quality
        useCORS: true, // For images hosted across domains
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${Bank.SelectedBank}-${name}.png`;
      link.href = image;
      link.click();
    }
  };

  return (
    <Card className="min-w-72 max-w-sm dark:bg-white text-black relative overflow-hidden">
      <div className="flex justify-between px-4 pt-4">
        <p className="text-2xl font-bold text-gray-900">{type}</p>
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

      <div
        ref={qrRef}
        className="pt-5 m-0 flex flex-col items-center border-none"
      >
        {/* Render QR code only if qrData is available */}
        <img
          src={IMAGES.khaltiLogo}
          alt="eSewa Logo"
          className="h-20 object-contain my-3"
        />
        <span className="mb-5 text-sm text-gray-500 my-2">
          Show your QR Code to accept payments
        </span>
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
            logoImage={IMAGES.QRc_khalti}
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

        <h5 className="mt-5 mb-1 text-xl font-medium text-gray-900">{name}</h5>
        <span className="text-base text-gray-700">{Khalti_ID}</span>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 318">
          <path
            fill="#901aeb"
            fill-opacity="1"
            d="M -1 121 C 825 284 1042 226 1167 206 C 1280 175 1353 144 1440 96 L 1440 320 L 1392 320 C 1344 320 1248 320 1152 320 C 1056 320 960 320 864 320 C 768 320 672 320 576 320 C 480 320 384 320 288 320 C 192 320 96 320 48 320 L 0 320 Z Z"
          ></path>
          <path
            fill="#c99deb"
            fill-opacity="1"
            d="M -1 132 C 825 284 1042 226 1167 206 C 1280 175 1353 144 1440 96 C 1129 270 825 289 -3 70 Z Z"
          ></path>
        </svg>
      </div>

      <div className="w-full flex justify-center gap-4 mt-5">
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
