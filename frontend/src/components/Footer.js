import React from "react";
import footer_logo from "../assets/images/luxe logo golden-01.png";
import { Link } from "react-router-dom";
import "../css/footer.css";
import FooterBody from "./FooterBody";

const Footer = () => {
  return (
    <div className="container-fluid footerMain">
      <div className="footer">
        <Link to="/">
          <img src={footer_logo} alt="footer logo" />
        </Link>
        <p>
          Your destination for luxury grooming and premium care. We offer a full
          range of salon services designed to cater to men of style. From
          haircuts to facials, beard trims to hair treatments, we ensure every
          client leaves feeling confident and refreshed.
        </p>
        
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d422526.8718954453!2d72.03118!3d34.172143!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38decba579980eeb%3A0x229ad81531dae03f!2sWalyan%20Commercial%20Center!5e0!3m2!1sen!2sus!4v1727194792138!5m2!1sen!2sus"
        className="map"
        style={{ border: "0" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="email">
        <Link to="mailto:contact@luxegentlemensalon.com">
          <h3>contact@luxegentlemensalon.com</h3>
        </Link>
      </div>
      <FooterBody />

      <div className="copyright">
        <p>Copyright © 2024 Luxegentlemen Salon All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
