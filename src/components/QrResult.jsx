import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";

export default function QrResult(props) {
  let { ec, outerM, innerM, qrbox, qrM, colorM, outerR, innerR,type} = props;
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
      <p className="text-2xl font-bold text-gray-900 text-center ">{type}</p>
      <div ref={qrRef} className="flex flex-col items-center pb-10">
        {/* Render QR code only if qrData is available */}
        {Bank.decodedCode && (
          <QRCode
            value={Bank.decodedCode}
            size={256} // Smaller size for display
            {...(ec ? { ecLevel: ec } : {})}
            logoImage={`/images/esewaC.png`}
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
            {...(qrbox ? {qrStyle:qrbox}:{})}
            {...(qrM ?{logoPaddingStyle:"circle"}:{})}
          />
        )}
        <img
          src="/images/esewa_logo.png"
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
