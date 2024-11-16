import React from "react";
import image1 from "../assets/images/image-gallery-2.jpg";
import image2 from "../assets/images/image-gallery-4.jpg";
import image5 from "../assets/images/image-gallery-5.jpg";
import "../css/images.css";

const Images = () => {
  return (
    <div className="image-gallery">
      <div className="image-card">
        <img src={image1} alt="Hollywood Sign on The Hill" />
      </div>
      <div className="image-card">
        <img src={image2} alt="Palm Springs Road" />
      </div>
      <div className="image-card">
        <img src={image5} alt="Los Angeles Skyscrapers" />
      </div>
    </div>
  );
};

export default Images;
