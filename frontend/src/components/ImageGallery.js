import React from "react";
import image1 from "../assets/images/shop/IMG_1773.JPG";
import image2 from "../assets/images/shop/IMG_1782.JPG";
import image3 from "../assets/images/shop/IMG_1788.JPG";
import image4 from "../assets/images/shop/IMG_1776.JPG";
import "../css/imageGallery.css";
import { Link } from "react-router-dom";

const ImageGallery = () => {
  return (
    <div className="container-fluid mainImage" style={{ marginTop: "10rem" }}>
      <h1 style={{ textAlign: "center", color: "#fff" }}>
        Where Elegance Meets Excellence
      </h1>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <img
            src={image1}
            className="w-100 shadow-1-strong rounded mb-4 "
            alt="Wintry Mountain Landscape"
          />
          <h5>Refined Grooming, Redefined Elegance</h5>
          <p>
            At LUXE Gentlemen, we offer more than a haircut—we offer an elevated
            experience. From precision haircuts to beard styling, we cater to
            professionals, students, and eventgoers seeking refined, luxurious
            grooming tailored just for them.
          </p>
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          <img
            src={image2}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Mountains in the Clouds"
          />
          <h5>Precision Craftsmanship, Superior Care</h5>
          <p>
            LUXE Gentlemen specializes in facials, hair treatments, and expert
            grooming packages. Our team uses top-tier techniques to leave you
            looking sharp and feeling refreshed. Every service reflects our
            commitment to precision, care, and excellence.
          </p>
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          <img
            src={image3}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Yosemite National Park"
          />
          <h5>A Destination for the Modern Man</h5>
          <p>
            Experience luxury at LUXE Gentlemen, where your comfort and
            satisfaction come first. With an elegant atmosphere and expert
            services, we cater to men who value sophistication. Your grooming
            experience here is tailored for the modern gentleman.
          </p>
        </div>
      </div>
      {/* <div className="btn-container">
        <Link to="/work" className="btn">
          View More
        </Link>
      </div> */}
    </div>
  );
};

export default ImageGallery;
