import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

import "../../assets/styles/footer.css";

function Footer() {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      <div className="container">

        <div className="row gy-5">

          {/* Company */}

          <div className="col-lg-4">

            <h2 className="footer-logo">
              AutoCare
            </h2>

            <p className="footer-description">
              Your trusted automobile service platform providing
              premium vehicle maintenance, repair services,
              certified mechanics and genuine spare parts.
            </p>

            <div className="footer-social">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div className="col-lg-2 col-md-6">

            <h5>Quick Links</h5>

            <ul>

              <li><Link to="/">Home</Link></li>

              <li><Link to="/about">About</Link></li>

              <li><Link to="/services">Services</Link></li>

              <li><Link to="/contact">Contact</Link></li>

            </ul>

          </div>

          {/* Services */}

          <div className="col-lg-3 col-md-6">

            <h5>Our Services</h5>

            <ul>

              <li>Oil Change</li>

              <li>Engine Repair</li>

              <li>Brake Service</li>

              <li>AC Service</li>

              <li>Wheel Alignment</li>

              <li>Battery Replacement</li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-3">

            <h5>Contact Info</h5>

            <div className="footer-contact">

              <div>

                <FaMapMarkerAlt />

                <span>
                  Kolkata, West Bengal, India
                </span>

              </div>

              <div>

                <FaPhoneAlt />

                <span>
                  +91 98765 43210
                </span>

              </div>

              <div>

                <FaEnvelope />

                <span>
                  support@autocare.com
                </span>

              </div>

            </div>

          </div>

        </div>

        <hr />

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} AutoCare. All Rights Reserved.
          </p>

          <p>
            Developed by <strong>Pobitra Poria</strong>
          </p>

        </div>

      </div>

      <button
        className="scroll-top"
        onClick={scrollTop}
      >
        <FaArrowUp />
      </button>

    </footer>
  );
}

export default Footer;