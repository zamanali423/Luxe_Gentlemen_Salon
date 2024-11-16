import React from "react";
import "../css/barbers.css";
import barber1 from "../assets/images/barber-image-3.JPG";
import barber2 from "../assets/images/barber-image-4.JPG";
import barber3 from "../assets/images/barber-image-5.JPG";
import barber4 from "../assets/images/barber-image-6.JPG";

const Barbers = ({ handleBarber, setBarberNo }) => {
  return (
    <div className="container-fluid teamContainer barbersMain">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div
          className="col col-lg-3 col-md-4 onlyCard"
          onClick={() => {
            handleBarber("Mubashir Ali");
            setBarberNo("03126482205");
          }}
        >
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
        <div
          className="col col-lg-3 col-md-4 onlyCard"
          onClick={() => {
            handleBarber("Usman Shabir");
            setBarberNo("03440535591");
          }}
        >
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
        <div
          className="col col-lg-3 col-md-4 onlyCard"
          onClick={() => {
            handleBarber("Hassan Ali");
            setBarberNo("03335380071");
          }}
        >
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
        <div
          className="col col-lg-3 col-md-4 onlyCard"
          onClick={() => {
            handleBarber("Haider Ali");
            setBarberNo("03044610736");
          }}
        >
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

export default Barbers;
