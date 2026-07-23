import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await authService.login(formData);

            login(response.data);

            const role = response.data.role;

            if (role === "ADMIN") {

                navigate("/admin/dashboard");

            } else if (role === "STAFF") {

                navigate("/staff/dashboard");

            } else {

                navigate("/customer/dashboard");

            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow-lg border-0 rounded-4">

                        <div className="card-body p-5">

                            <h2 className="text-center mb-4">
                                Welcome Back
                            </h2>

                            <p className="text-center text-muted mb-4">
                                Login to AutoCare
                            </p>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>

                            </form>

                            <div className="text-center mt-4">

                                Don't have an account?

                                <Link
                                    to="/register"
                                    className="ms-2"
                                >
                                    Register
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;