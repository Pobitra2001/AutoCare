import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";

import serviceRecordService from "../../../services/serviceRecordService";
import vehicleService from "../../../services/vehicleService";
import bookingService from "../../../services/bookingService";

function ServiceRecordForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = !!id;

    const [vehicles, setVehicles] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        serviceType: "",

        description: "",

        serviceDate: "",

        status: "PENDING",

        vehicleId: "",

        bookingId: ""

    });

    useEffect(() => {

        loadDropdowns();

        if (isEdit) {

            loadServiceRecord();

        }

    }, []);

    const loadDropdowns = async () => {

        try {

            const vehicleResponse =
                await vehicleService.getAllVehicles();

            const bookingResponse =
                await bookingService.getAllBookings();

            setVehicles(vehicleResponse.data);

            setBookings(bookingResponse.data);

        } catch (error) {

            console.error(error);

        }

    };

    const loadServiceRecord = async () => {

        try {

            setLoading(true);

            const response =
                await serviceRecordService.getServiceRecordById(id);

            setFormData(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (isEdit) {

                await serviceRecordService.updateServiceRecord(
                    id,
                    formData
                );

                alert("Service Record updated successfully.");

            } else {

                await serviceRecordService.createServiceRecord(
                    formData
                );

                alert("Service Record created successfully.");

            }

            navigate("/admin/service-records");

        } catch (error) {

            console.error(error);

            alert("Operation failed.");

        }

    };

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

            </div>

        );

    }

    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2 p-0">

                    <Sidebar />

                </div>

                <div className="col-md-10 p-4">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h4>

                                {

                                    isEdit

                                        ? "Edit Service Record"

                                        : "Add Service Record"

                                }

                            </h4>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Service Type

                                        </label>

                                        <input
                                            type="text"
                                            name="serviceType"
                                            className="form-control"
                                            value={formData.serviceType}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Service Date

                                        </label>

                                        <input
                                            type="date"
                                            name="serviceDate"
                                            className="form-control"
                                            value={formData.serviceDate}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Description

                                    </label>

                                    <textarea
                                        rows="4"
                                        name="description"
                                        className="form-control"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="row">

                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">

                                            Status

                                        </label>

                                        <select
                                            name="status"
                                            className="form-select"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >

                                            <option value="PENDING">

                                                PENDING

                                            </option>

                                            <option value="IN_PROGRESS">

                                                IN PROGRESS

                                            </option>

                                            <option value="COMPLETED">

                                                COMPLETED

                                            </option>

                                            <option value="CANCELLED">

                                                CANCELLED

                                            </option>

                                        </select>

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">

                                            Vehicle

                                        </label>

                                        <select
                                            name="vehicleId"
                                            className="form-select"
                                            value={formData.vehicleId}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">

                                                Select Vehicle

                                            </option>

                                            {

                                                vehicles.map(vehicle => (

                                                    <option
                                                        key={vehicle.id}
                                                        value={vehicle.id}
                                                    >

                                                        {vehicle.vehicleNumber}

                                                    </option>

                                                ))

                                            }

                                        </select>

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">

                                            Booking

                                        </label>

                                        <select
                                            name="bookingId"
                                            className="form-select"
                                            value={formData.bookingId}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">

                                                Select Booking

                                            </option>

                                            {

                                                bookings.map(booking => (

                                                    <option
                                                        key={booking.id}
                                                        value={booking.id}
                                                    >

                                                        #{booking.id} - {booking.customerName}

                                                    </option>

                                                ))

                                            }

                                        </select>

                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >

                                    {

                                        isEdit

                                            ? "Update Service Record"

                                            : "Save Service Record"

                                    }

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ServiceRecordForm;