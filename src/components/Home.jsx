import React from "react";
import Service_type from "./Service_type";

const Home = () => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Service_type
        logo={"esewaLogo"}
        name={"Esewa"}
        desc={"Customize your eSewa Qr code"}
      />
      <Service_type
        logo={"khaltiLogo"}
        name={"Khalti"}
        desc={"Customize your Khalti Qr code"}
      />
    </div>
  );
};

export default Home;
