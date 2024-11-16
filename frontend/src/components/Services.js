import React, { useContext } from "react";
import "../css/services.css";
import img1 from "../assets/images/royal-shave-gallery-1.jpg";
import { productContext } from "../context/productContext/productContext";
import { Link } from "react-router-dom";

const Services = () => {
  const { allServices, servicesRef } = useContext(productContext);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <button class="button">
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">SERVICES</span>
          </span>
        </button>
      </div>

      <Service allServices={allServices} servicesRef={servicesRef} index={1} />
      <Service allServices={allServices} servicesRef={servicesRef} index={0} />
      <Service allServices={allServices} servicesRef={servicesRef} index={2} />

      <Link to="/services" className="btn view-more-btn">
        View More Services
      </Link>
    </>
  );
};

export default Services;

const Service = ({ allServices, servicesRef, index }) => {
  const getChunkSize = () => (window.innerWidth >= 768 ? 4 : 1);
  const chunkServices = (arr) => {
    const chunkSize = getChunkSize();
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const carouselId = `carouselExampleControls-${index}`;
  return (
    <>
      <div
        id={carouselId}
        className="carousel carousel-dark slide container"
        ref={servicesRef}
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {allServices &&
          allServices.length > 0 &&
          allServices[index]?.services ? (
            chunkServices(allServices[index].services, 4).map(
              (serviceChunk, chunkIndex) => (
                <div
                  className={`carousel-item ${
                    chunkIndex === 0 ? "active" : ""
                  }`}
                  key={chunkIndex}
                >
                  <div className="row">
                    <h5 className="card-title cardHead">
                      {allServices[index].categoryName}
                    </h5>
                    {serviceChunk.map((service, index) => (
                      <div
                        className="col-lg-3 col-md-6 col-sm-12 mb-3"
                        key={index}
                      >
                        <div className="card h-100">
                          <Link to={`/services/service/${service.id}`}>
                            <img
                              src={service.image ? service.image : img1}
                              className="card-img-top"
                              alt={service.title}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{service.title}</h5>
                              <p className="card-text">{service.price} PKR</p>
                              <Link
                                to={`/services/service/${service.id}`}
                                className="btn"
                              >
                                Book an Appointment
                              </Link>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          ) : (
            <h1 style={{ color: "#fff" }}>Loading...</h1>
          )}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};
