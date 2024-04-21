import React, { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import CSS1 from "../componentCSS/Truning_Effect.module.css";


export default function Truning_Effect() {

  const greetingsArray = [
    "Hello", // English
    "नमस्ते", // Nepali
    "Bonjour", // French
    "Hola", // Spanish
    "Nǐn hǎo", // Chinese (Mandarin)
    "Salve", // Italian
    "Konnichiwa", // Japanese
    "Guten Tag", // German
    "Olá", // Portuguese
    "प्रणाम", // Maithili
  ];

  const [txt, setTxt] = useState(greetingsArray[0]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const initialDisplayTime = 1100; // 1.4 seconds for "Hello"
    const intervalStep = 500; // Decrease interval by 200ms for each word

    let currentIndex = 1;
    let currentInterval = initialDisplayTime;

    const timer = () => {
      if (currentIndex < greetingsArray.length) {
        setTxt(greetingsArray[currentIndex]);
        currentIndex++;
        if (currentInterval > 200) {
          currentInterval -= intervalStep;
        }
        return setTimeout(timer, currentInterval);
      } else {
        setIsFinished(true);
        setTimeout(() => {
          
        }, 2000);
      }
    };

    const timeoutId = setTimeout(timer, initialDisplayTime);

    // Clear the timeout when the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`${CSS1.TE} ${isFinished ? CSS1.slideOutAndCurve : ""} z-5`}
    >
      <div className={CSS1.txt}>
        <GoDotFill style={{ fontSize: "25px", paddingRight: "12px" }} />
        {txt}
      </div>
    </div>
  );
}
