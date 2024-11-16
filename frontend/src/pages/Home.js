import React from "react";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import ImageGallery from "../components/ImageGallery";
import Team from "../components/Team";
import Vision from "../components/Vision";
import Feedback from "../components/Feedback";
import ProfileContent from "../components/ProfileContent";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ProfileContent />
      <Services />
      <ImageGallery />
      <Vision />
      <Team />
      <Feedback />
    </>
  );
};

export default Home;
