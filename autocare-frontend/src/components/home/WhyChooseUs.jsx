import {
  FaUserCog,
  FaShieldAlt,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";

import "../../assets/styles/whychoose.css";

const features = [
  {
    icon: <FaUserCog />,
    title: "Certified Mechanics",
    description:
      "Our experienced and certified mechanics ensure every vehicle receives expert care.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Genuine Spare Parts",
    description:
      "We use only high-quality genuine spare parts for maximum reliability and performance.",
  },
  {
    icon: <FaDollarSign />,
    title: "Transparent Pricing",
    description:
      "No hidden charges. Get clear estimates before any repair or maintenance work begins.",
  },
  {
    icon: <FaClock />,
    title: "Fast & Reliable Service",
    description:
      "Quick turnaround times without compromising quality, so you're back on the road sooner.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">

      <div className="container">

        <div className="section-header">

          <span>WHY CHOOSE US</span>

          <h2>Why Thousands Trust AutoCare</h2>

          <p>
            We combine modern technology, skilled professionals and customer-first
            service to provide a hassle-free automobile service experience.
          </p>

        </div>

        <div className="row g-4">

          {features.map((feature, index) => (

            <div className="col-lg-3 col-md-6" key={index}>

              <div className="why-card">

                <div className="why-icon">
                  {feature.icon}
                </div>

                <h4>{feature.title}</h4>

                <p>{feature.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;