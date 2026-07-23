import { NavLink } from "react-router-dom";

import "../../assets/styles/navbar.css";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg sticky-top">

            <div className="container">

                <NavLink className="navbar-brand logo" to="/">

                    AutoCare

                </NavLink>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu">

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div className="collapse navbar-collapse" id="menu">

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">

                            <NavLink className="nav-link" to="/">

                                Home

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink className="nav-link" to="/about">

                                About

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink className="nav-link" to="/services">

                                Services

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink className="nav-link" to="/contact">

                                Contact

                            </NavLink>

                        </li>

                        <li className="nav-item ms-3">

                            <NavLink
                                className="nav-link btn-login"
                                to="/login">

                                Login

                            </NavLink>

                        </li>

                        <li className="nav-item ms-2">

                            <NavLink
                                className="nav-link btn-register"
                                to="/register">

                                Register

                            </NavLink>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;