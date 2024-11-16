import React, { useContext } from "react";
import "../css/vision.css";
import owner from "../assets/images/owner2.JPEG";
import { productContext } from "../context/productContext/productContext";

const Vision = () => {
  const { aboutRef } = useContext(productContext);
  return (
    <div className="visionContainer" ref={aboutRef}>
      <section class="vision-section">
        <div class="vision-container">
          <div class="image-container">
            <img src={owner} alt="Owner" class="owner-image" />
          </div>
          <div class="text-container">
            <h2>Elevating Grooming Experiences</h2>
            <h4>Expanding Boundaries, Elevating Standards</h4>
            <p>
              At LUXE Gentlemen, we are dedicated to transforming men’s grooming
              through superior service and a luxurious experience. Our future
              expansion includes innovative projects such as an aesthetic
              clinic, female-exclusive parlors, and a designated salon for kids.
              Our goal is to ensure every member of the family enjoys the
              highest standards of grooming, all under one roof, with a
              commitment to quality, care, and sophistication.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision;
