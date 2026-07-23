import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const isActive = (path) => {

        return location.pathname.startsWith(path)
            ? "active"
            : "";

    };

    return (

        <div
            className="bg-dark text-white vh-100 p-3"
            style={{ minHeight: "100vh" }}
        >

            <h4 className="text-center mb-4">

                <i className="bi bi-tools me-2"></i>

                AutoCare

            </h4>

            <hr className="border-secondary" />

            <ul className="nav flex-column">

                {/* Dashboard */}

                <li className="nav-item mb-2">

                    <Link
                        to="/admin/dashboard"
                        className={`nav-link text-white ${isActive("/admin/dashboard")}`}
                    >

                        <i className="bi bi-speedometer2 me-2"></i>

                        Dashboard

                    </Link>

                </li>

                {/* Customers */}

                <li className="nav-item mb-2">

                    <Link
                        to="/admin/customers"
                        className={`nav-link text-white ${isActive("/admin/customers")}`}
                    >

                        <i className="bi bi-people-fill me-2"></i>

                        Customers

                    </Link>

                </li>

                {/* Vehicles */}

                <li className="nav-item mb-2">

                    <Link
                        to="/admin/vehicles"
                        className={`nav-link text-white ${isActive("/admin/vehicles")}`}
                    >

                        <i className="bi bi-car-front-fill me-2"></i>

                        Vehicles

                    </Link>

                </li>

                {/* Bookings */}

                <li className="nav-item mb-2">

                    <Link
                        to="/admin/bookings"
                        className={`nav-link text-white ${isActive("/admin/bookings")}`}
                    >

                        <i className="bi bi-calendar-check me-2"></i>

                        Bookings

                    </Link>

                </li>

                {/* Service Records */}

                <li className="nav-item mb-2">

                    <Link
                        to="/admin/service-records"
                        className={`nav-link text-white ${isActive("/admin/service-records")}`}
                    >

                        <i className="bi bi-wrench-adjustable-circle me-2"></i>

                        Service Records

                    </Link>

                </li>

                {/* Invoices */}

                <li className="nav-item mb-2">

                    <Link
                        to="/admin/invoices"
                        className={`nav-link text-white ${isActive("/admin/invoices")}`}
                    >

                        <i className="bi bi-receipt-cutoff me-2"></i>

                        Invoices

                    </Link>

                </li>

                {/* Feedback */}

                <li className="nav-item mb-2">

                    <Link
                        to="/admin/feedback"
                        className={`nav-link text-white ${isActive("/admin/feedback")}`}
                    >

                        <i className="bi bi-chat-left-text-fill me-2"></i>

                        Feedback

                    </Link>

                </li>

                {/* Contact Messages */}

                <li className="nav-item mb-2">

                    <Link
                        to="/admin/contact-messages"
                        className={`nav-link text-white ${isActive("/admin/contact-messages")}`}
                    >

                        <i className="bi bi-envelope-fill me-2"></i>

                        Contact Messages

                    </Link>

                </li>

                <hr className="border-secondary my-3" />

                {/* Logout */}

                <li className="nav-item">

                    <button
                        className="btn btn-danger w-100"
                        onClick={() => {

                            localStorage.removeItem("token");
                            localStorage.removeItem("user");

                            window.location.href = "/login";

                        }}
                    >

                        <i className="bi bi-box-arrow-right me-2"></i>

                        Logout

                    </button>

                </li>

            </ul>

        </div>

    );

}

export default Sidebar;