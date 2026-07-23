import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customerService from "../../../services/customerService";

function CustomerForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {

        if (id) {
            loadCustomer();
        }

    }, [id]);

    const loadCustomer = async () => {

        try {

            const response = await customerService.getCustomerById(id);

            setFormData({
                name: response.data.name,
                phone: response.data.phone,
                email: response.data.email,
                address: response.data.address,
            });

        } catch (err) {

            setError("Unable to load customer.");

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            if (id) {

                await customerService.updateCustomer(id, formData);

                setSuccess("Customer updated successfully.");

            } else {

                await customerService.createCustomer(formData);

                setSuccess("Customer added successfully.");

            }

            setTimeout(() => {

                navigate("/admin/customers");

            }, 1000);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                (id
                    ? "Unable to update customer."
                    : "Unable to add customer.")
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    {id ? "Edit Customer" : "Add Customer"}
                </h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/admin/customers")}
                >
                    Back
                </button>

            </div>

            <div className="card shadow border-0">

                <div className="card-body">

                    {error && (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    )}

                    {success && (

                        <div className="alert alert-success">

                            {success}

                        </div>

                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter customer name"
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Phone

                                </label>

                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="10-digit mobile number"
                                    pattern="[6-9]{1}[0-9]{9}"
                                    required
                                />

                            </div>

                        </div>

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
                                placeholder="example@gmail.com"
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">

                                Address

                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter customer address"
                                required
                            />

                        </div>

                        <div className="d-flex gap-2">

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading
                                    ? (id ? "Updating..." : "Saving...")
                                    : (id ? "Update Customer" : "Save Customer")}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/admin/customers")}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default CustomerForm;