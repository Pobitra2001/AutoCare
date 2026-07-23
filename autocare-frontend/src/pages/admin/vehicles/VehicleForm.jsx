import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vehicleService from "../../../services/vehicleService";
import customerService from "../../../services/customerService";

function VehicleForm() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({

        customerId: "",

        vehicleNumber: "",

        brand: "",

        model: "",

        color: "",

        vehicleType: "",

        fuelType: "",

        manufacturingYear: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    useEffect(() => {

        loadCustomers();

    }, []);

    const loadCustomers = async () => {

        try {

            const response = await customerService.getAllCustomers(0, 100);

            setCustomers(response.data.content);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        setSuccess("");

        try {

            await vehicleService.createVehicle({

                ...formData,

                customerId: Number(formData.customerId),

                manufacturingYear: Number(formData.manufacturingYear)

            });

            setSuccess("Vehicle added successfully.");

            setTimeout(() => {

                navigate("/admin/vehicles");

            }, 1000);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to add vehicle."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Add Vehicle

                </h2>

                <button

                    className="btn btn-secondary"

                    onClick={() => navigate("/admin/vehicles")}

                >

                    Back

                </button>

            </div>

            <div className="card shadow border-0">

                <div className="card-body">

                    {error &&

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    }

                    {success &&

                        <div className="alert alert-success">

                            {success}

                        </div>

                    }

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Customer

                                </label>

                                <select

                                    className="form-select"

                                    name="customerId"

                                    value={formData.customerId}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">

                                        Select Customer

                                    </option>

                                    {

                                        customers.map(customer => (

                                            <option

                                                key={customer.id}

                                                value={customer.id}

                                            >

                                                {customer.name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Vehicle Number

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="vehicleNumber"

                                    value={formData.vehicleNumber}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Brand

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="brand"

                                    value={formData.brand}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Model

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="model"

                                    value={formData.model}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Vehicle Type

                                </label>

                                <select

                                    className="form-select"

                                    name="vehicleType"

                                    value={formData.vehicleType}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">Select</option>

                                    <option value="CAR">CAR</option>

                                    <option value="BIKE">BIKE</option>

                                    <option value="TRUCK">TRUCK</option>

                                    <option value="BUS">BUS</option>

                                </select>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Fuel Type

                                </label>

                                <select

                                    className="form-select"

                                    name="fuelType"

                                    value={formData.fuelType}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">Select</option>

                                    <option value="PETROL">PETROL</option>

                                    <option value="DIESEL">DIESEL</option>

                                    <option value="CNG">CNG</option>

                                    <option value="ELECTRIC">ELECTRIC</option>

                                </select>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Manufacturing Year

                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="manufacturingYear"

                                    value={formData.manufacturingYear}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                        </div>

                        <div className="mb-4">

                            <label className="form-label">

                                Color

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="color"

                                value={formData.color}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="d-flex gap-2">

                            <button

                                type="submit"

                                className="btn btn-primary"

                                disabled={loading}

                            >

                                {

                                    loading

                                        ?

                                        "Saving..."

                                        :

                                        "Save Vehicle"

                                }

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() => navigate("/admin/vehicles")}

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

export default VehicleForm;