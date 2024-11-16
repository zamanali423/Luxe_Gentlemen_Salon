import React from "react";
import "../css/backToTop.css";

const BackToTop = () => {
  const back = () => {
    window.scroll(0, 0);
  };
  return (
    <>
      <a href="#" className="to-top" onClick={back}>
        <i className="fa-solid fa-chevron-up"></i>
      </a>
    </>
  );
};

export default BackToTop;
