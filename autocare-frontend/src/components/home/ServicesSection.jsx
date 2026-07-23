import {
  FaOilCan,
  FaTools,
  FaSnowflake,
  FaCarSide,
  FaArrowRight,
} from "react-icons/fa";

import "../../assets/styles/services.css";

const services = [
  {
    icon: <FaOilCan />,
    title: "Oil Change",
    description:
      "Premium engine oil replacement with genuine filters for maximum engine performance.",
  },
  {
    icon: <FaTools />,
    title: "Engine Repair",
    description:
      "Complete engine diagnostics, repair and maintenance by certified mechanics.",
  },
  {
    icon: <FaSnowflake />,
    title: "AC Service",
    description:
      "Professional AC inspection, gas refill and cooling system maintenance.",
  },
  {
    icon: <FaCarSide />,
    title: "Wheel Alignment",
    description:
      "Computerized wheel alignment and balancing for smoother driving experience.",
  },
];

function ServicesSection() {
  return (
    <section className="services-section">

      <div className="container">

        <div className="section-header">

          <span>OUR SERVICES</span>

          <h2>
            Complete Auto Care <br /> Under One Roof
          </h2>

          <p>
            We provide professional automobile maintenance and repair
            services with modern equipment and experienced technicians.
          </p>

        </div>

        <div className="row g-4">

          {services.map((service, index) => (

            <div className="col-lg-3 col-md-6" key={index}>

              <div className="service-card">

                <div className="service-icon">
                  {service.icon}
                </div>

                <h4>{service.title}</h4>

                <p>{service.description}</p>

                <button className="service-btn">
                  Learn More <FaArrowRight />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ServicesSection;