// Navbar_Main.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice"; // Adjust the import path as needed
import { Navbar, DarkThemeToggle } from "flowbite-react";
import { IMAGES } from "../images/Images";
import { Link } from "react-router-dom";

const Navbar_Main = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  // Effect to apply the theme class to the body element
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <Navbar fluid>
      <Navbar.Brand >
        <img
          src={IMAGES.Navlogo} 
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DarkThemeToggle onClick={handleThemeChange} />
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to='/about' >About</Navbar.Link>
        <Navbar.Link href="https://razusharmaa.github.io/Esewa-QrGenerator/">Switch to V1</Navbar.Link>
        <Navbar.Link href="#">More tool</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar_Main;
