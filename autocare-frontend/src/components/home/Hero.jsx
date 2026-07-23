import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaCarSide,
  FaTools,
  FaShieldAlt,
} from "react-icons/fa";

import heroCar from "../../assets/images/hero-car.jpg";
import "../../assets/styles/hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="container">

        <div className="row align-items-center">

          {/* Left Side */}

          <div className="col-lg-6">

            <span className="hero-badge">
              Trusted Automobile Service Since 2026
            </span>

            <h1 className="hero-title">
              Professional <span>Car Care</span><br />
              You Can Trust
            </h1>

            <p className="hero-text">
              AutoCare provides expert vehicle servicing with certified
              mechanics, genuine spare parts, transparent pricing and
              hassle-free maintenance to keep your vehicle performing at its
              best.
            </p>

            <div className="hero-buttons">

              <Link to="/booking" className="btn btn-primary btn-lg me-3">
                Book Service
              </Link>

              <Link to="/services" className="btn btn-outline-dark btn-lg">
                Explore Services
              </Link>

            </div>

            <div className="hero-features mt-5">

              <div>
                <FaCheckCircle className="feature-icon" />
                Certified Mechanics
              </div>

              <div>
                <FaShieldAlt className="feature-icon" />
                Genuine Parts
              </div>

              <div>
                <FaTools className="feature-icon" />
                Expert Service
              </div>

              <div>
                <FaCarSide className="feature-icon" />
                All Car Brands
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 text-center">

            <img
              src={heroCar}
              alt="AutoCare"
              className="hero-image"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;