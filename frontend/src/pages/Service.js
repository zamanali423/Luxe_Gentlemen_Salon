import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import img1 from "../assets/images/royal-shave-gallery-1.jpg";
import { productContext } from "../context/productContext/productContext";
import { Link } from "react-router-dom";

const Service = () => {
  const { allServices } = useContext(productContext);
  console.log(allServices);

  return (
    <>
      <Navbar />
      {allServices && allServices.length > 0 ? (
        <div style={{ marginTop: "10rem" }}>
          <AllServices
            index={0}
            allServices={allServices}
            category={allServices[0].categoryName}
          />
          <AllServices
            index={1}
            allServices={allServices}
            category={allServices[1].categoryName}
          />
          <AllServices
            index={2}
            allServices={allServices}
            category={allServices[2].categoryName}
          />
          <AllServices
            index={3}
            allServices={allServices}
            category={allServices[3].categoryName}
          />
          <AllServices
            index={4}
            allServices={allServices}
            category={allServices[4].categoryName}
          />
          <AllServices
            index={5}
            allServices={allServices}
            category={allServices[5].categoryName}
          />
          <AllServices
            index={6}
            allServices={allServices}
            category={allServices[6].categoryName}
          />
          <AllServices
            index={7}
            allServices={allServices}
            category={allServices[7].categoryName}
          />
        </div>
      ) : (
        <h1 style={{ color: "#fff", marginTop:"10rem" }}>Loading...</h1>
      )}
    </>
  );
};

const AllServices = ({ allServices, index, category }) => {
  const getChunkSize = () => (window.innerWidth >= 768 ? 4 : 1);
  const chunkServices = (arr) => {
    const chunkSize = getChunkSize();
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  // Generate a unique ID for each carousel based on the category index
  const carouselId = `carouselExampleControls-${index}`;

  return (
    <div
      id={carouselId}
      className="carousel carousel-dark slide container"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {chunkServices(allServices[index].services, 4).map(
          (serviceChunk, chunkIndex) => (
            <div
              className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`}
              key={chunkIndex}
            >
              <div className="row">
                <h5 className="card-title cardHead">{category}</h5>
                {serviceChunk.map((service, serviceIndex) => (
                  <div className="col-lg-3 col-md-6 mb-3" key={serviceIndex}>
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
                          <a
                            href={`/services/service/${service.id}`}
                            className="btn"
                          >
                            Book an Appointment
                          </a>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Service;
