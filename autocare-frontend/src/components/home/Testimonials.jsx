import { FaStar, FaQuoteLeft } from "react-icons/fa";
import "../../assets/styles/testimonials.css";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Car Owner",
    review:
      "AutoCare provided excellent service. The mechanics were professional, the pricing was transparent, and my car was delivered on time.",
  },
  {
    name: "Priya Das",
    role: "Business Owner",
    review:
      "Booking a service was easy and the entire experience was smooth. Highly recommend AutoCare for reliable vehicle maintenance.",
  },
  {
    name: "Amit Roy",
    role: "Software Engineer",
    review:
      "Great customer support and quality work. My vehicle feels brand new after the complete service package.",
  },
];

function Testimonials() {
  return (
    <section className="testimonial-section">

      <div className="container">

        <div className="section-header">

          <span>TESTIMONIALS</span>

          <h2>What Our Customers Say</h2>

          <p>
            Customer satisfaction is our highest priority. Here's what our
            customers say about AutoCare.
          </p>

        </div>

        <div className="row g-4">

          {testimonials.map((item, index) => (

            <div className="col-lg-4" key={index}>

              <div className="testimonial-card">

                <FaQuoteLeft className="quote-icon" />

                <div className="stars">

                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                </div>

                <p className="review">
                  "{item.review}"
                </p>

                <div className="customer">

                  <div className="avatar">
                    {item.name.charAt(0)}
                  </div>

                  <div>

                    <h5>{item.name}</h5>

                    <span>{item.role}</span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;