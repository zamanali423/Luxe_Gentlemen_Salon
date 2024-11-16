import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/luxe logo golden-01.png";
import { productContext } from "../context/productContext/productContext";

const Navbar = () => {
  const { servicesRef } = useContext(productContext);
  const [navbarBg, setNavbarBg] = useState("transparent");
  const location = useLocation();

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle scroll to change navbar background color
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        if (window.scrollY > 100) {
          setNavbarBg("#000"); // Change to your desired background color after scrolling
        } else {
          setNavbarBg("transparent");
        }
      } else {
        setNavbarBg("#000");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-light"
        style={{
          backgroundColor: navbarBg,
          transition: "background-color 0.3s ease",
        }} // Inline style for background color
      >
        <div className="container-fluid">
          <Link className="navbar-brand logoContainer" to="/">
            <img className="logo" src={logo} alt="Luxe Gentlemen" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/work">
                  Works
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/barbers">
                  Barbers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Owner Dashboard
                </Link>
              </li>
            </ul>
            <button className="btn" onClick={scrollToServices}>
              Book an Appointment
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
