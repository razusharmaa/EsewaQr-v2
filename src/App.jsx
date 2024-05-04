// App.jsx
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import Navbar_Main from "./components/Navbar_Main";
import Home from "./components/Home";
import Input_field from "./components/Input_field";
import AlertMain from "./components/AlertMain";
import FooterM from "./components/FooterM";
import Truning_Effect from "./components/Truning_Effect";
import Output_E from "./components/Output_E";
import Output_K from "./components/Output_K";
import About from "./components/About";

const App = () => {
  return (
    <HashRouter>
      <Flowbite>
        <Truning_Effect />
        <Navbar_Main />
        <AlertMain />
        <div className="min-h-screen mx-2.5	 dark:bg-neutral-900 sm:max-w-full">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/input" element={<Input_field />} />
            <Route exact path="/output_E" element={<Output_E />} />
            <Route exact path="/output_K" element={<Output_K />} />
            <Route exact path="/about" element={<About/>} />
          </Routes>
        </div>
        <FooterM />
      </Flowbite>
    </HashRouter>
  );
};

export default App;
