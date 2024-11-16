import React from "react";
import "../css/team.css";
import barber1 from "../assets/images/barber-image-31.JPG";
import barber2 from "../assets/images/barber-image-41.JPG";
import barber3 from "../assets/images/barber-image-51.JPG";
import barber4 from "../assets/images/barber-image-61.JPG";

const Team = () => {
  return (
    <div
      className="container-fluid teamContainer team"
    >
      <h1 style={{ color: "#fff" }}>Our team is here to inspire you</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col col-lg-3 col-md-4">
          <div
            className="card card-with-bg"
            style={{
              backgroundImage: `url(${barber1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Mubashir Ali</h5>
            </div>
          </div>
        </div>
        <div className="col col-lg-3 col-md-4">
          <div
            className="card card-with-bg"
            style={{
              backgroundImage: `url(${barber2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Usman Shabir</h5>
            </div>
          </div>
        </div>
        <div className="col col-lg-3 col-md-4">
          <div
            className="card card-with-bg"
            style={{
              backgroundImage: `url(${barber3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Hassan Ali</h5>
            </div>
          </div>
        </div>
        <div className="col col-lg-3 col-md-4">
          <div
            className="card card-with-bg"
            style={{
              backgroundImage: `url(${barber4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Haider Ali</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
