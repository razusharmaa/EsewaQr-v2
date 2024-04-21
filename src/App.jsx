// App.jsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import Navbar_Main from './components/Navbar_Main';
import Home from './components/Home';
import Input_field from './components/Input_field';
import AlertMain from './components/AlertMain';
import Output from './components/Output';
import FooterM from './components/FooterM'

const App = () => {

  return (
    <HashRouter>
      <Flowbite>
      <Navbar_Main />
      <AlertMain/>
        <div className='min-h-screen mx-2.5	 dark:bg-neutral-900 sm:max-w-full'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/input" element={<Input_field/>} />
            <Route exact path="/output" element={<Output/>} />
          </Routes>
        </div>
        <FooterM/>
      </Flowbite>
    </HashRouter>
  );
};

export default App;
