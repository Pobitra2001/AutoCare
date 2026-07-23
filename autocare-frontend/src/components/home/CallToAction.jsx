import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import "../../assets/styles/cta.css";

function CallToAction() {

    return (

        <section className="cta-section">

            <div className="container">

                <div className="cta-box">

                    <span className="cta-badge">
                        READY TO GET STARTED?
                    </span>

                    <h2>
                        Give Your Car the Care It Deserves
                    </h2>

                    <p>
                        Schedule your vehicle service today with AutoCare's
                        certified mechanics. We ensure quality service,
                        genuine parts, transparent pricing and complete
                        customer satisfaction.
                    </p>

                    <div className="cta-buttons">

                        <Link
                            to="/services"
                            className="btn btn-light btn-lg me-3"
                        >
                            Book Service
                        </Link>

                        <Link
                            to="/contact"
                            className="btn btn-outline-light btn-lg"
                        >
                            Contact Us <FaArrowRight />
                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default CallToAction;