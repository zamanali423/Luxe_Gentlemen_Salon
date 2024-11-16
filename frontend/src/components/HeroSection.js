import React from "react";
import "../css/herosection.css";
import bgVideo from "../videos/bg_video.mp4";
import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <div>
      <video autoPlay muted loop playsInline className="background-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>
      <Navbar />
      <div className="hero">
        <h1 className="h1">
          <span>Elegance in Every Trim</span>
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
