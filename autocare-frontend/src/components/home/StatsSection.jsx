import {
  FaUsers,
  FaCarSide,
  FaTools,
  FaStar,
} from "react-icons/fa";

import "../../assets/styles/stats.css";

const stats = [
  {
    icon: <FaUsers />,
    number: "5000+",
    title: "Happy Customers",
  },
  {
    icon: <FaCarSide />,
    number: "2500+",
    title: "Vehicles Serviced",
  },
  {
    icon: <FaTools />,
    number: "1200+",
    title: "Repairs Completed",
  },
  {
    icon: <FaStar />,
    number: "98%",
    title: "Customer Satisfaction",
  },
];

function StatsSection() {
  return (
    <section className="stats-section">

      <div className="container">

        <div className="row g-4">

          {stats.map((item, index) => (

            <div className="col-lg-3 col-md-6" key={index}>

              <div className="stats-card">

                <div className="stats-icon">
                  {item.icon}
                </div>

                <h2>{item.number}</h2>

                <p>{item.title}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default StatsSection;