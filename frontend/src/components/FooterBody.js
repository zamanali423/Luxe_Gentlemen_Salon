import React, { useContext } from "react";
import "../css/footerBody.css";
import { Link } from "react-router-dom";
import { productContext } from "../context/productContext/productContext";

const FooterBody = () => {
  const { aboutRef } = useContext(productContext);

  const scrollToVision = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <footer className="footer2">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4 className="useful">Useful Links</h4>
              <ul>
                <li>
                  <Link to="/services">Book An Appointment</Link>
                </li>
                <li>
                  <Link to="#">FAQs</Link>
                </li>

                <li>
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="useful">Company Profile</h4>
              <ul>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li onClick={scrollToVision}>
                  <Link to="#">About Us</Link>
                </li>
                <li>
                  <Link
                    to="https://wa.me/923409384412?text=Hello%20Luxe%20Gentleman%20Salon"
                    target="_blank"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Business Hours:</h4>
              <p>Mon-Sat: 11:00 AM - 11:00 PM Sun: 10:00 AM - 8:00 PM</p>
              <div className="footer-col location">
                <h4>Location:</h4>
                <p>
                  Walyan Commercial Center Nowshera road Mardan, near Khaksar
                  Super market and Rahat bakery.
                </p>
              </div>
            </div>

            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <Link
                  to="https://www.facebook.com/profile.php?id=61559206382274&mibextid=LQQJ4d"
                  target="_blank"
                  style={{ backgroundColor: "#0862f7" }}
                >
                  <i className="fa-brands fa-facebook"></i>
                </Link>
                <Link
                  to="https://www.instagram.com/luxegentlemen123/"
                  target="_blank"
                  style={{
                    background: "#f001d1",
                    background:
                      "-webkit-linear-gradient(192deg, #f001d1 0%, #f50e43 50%, #f6bc00 100%)",
                    background:
                      "linear-gradient(192deg, #f001d1 0%, #f50e43 50%, #f6bc00 100%)",
                  }}
                >
                  <i className="fa-brands fa-instagram"></i>
                </Link>
                <Link
                  to="https://www.tiktok.com/@luxegentlemensalon"
                  target="_blank"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <i className="fa-brands fa-tiktok"></i>
                </Link>
                <Link
                  to="https://wa.me/923409384412?text=Hello%20Luxe%20Gentleman%20Salon"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ backgroundColor: "#17bf35" }}
                >
                  <i class="fa-brands fa-whatsapp"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterBody;
