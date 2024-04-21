import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Service_type = ({ logo, name, desc }) => {
  let navigate = useNavigate();
  function handleClick() {
    const dataToSend = { type: logo };
    navigate("/input", { state: dataToSend });
  }
  return (
    <Card
      className="z-0"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={`/images/${logo}.png`}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{desc} </p>

      <Button onClick={handleClick}>
        Start
        <FaLongArrowAltRight className="ml-2 mt-1" />
      </Button>
    </Card>
  );
};

export default Service_type;
