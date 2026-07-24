import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar";
import bookingService from "../../../services/bookingService";

function BookingForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = !!id;

    const [formData, setFormData] = useState({

        customerName: "",
        email: "",
        phone: "",
        vehicleNumber: "",
        vehicleModel: "",
        serviceType: "",
        bookingDate: "",
        notes: ""

    });

    useEffect(() => {

        if (isEdit) {

            loadBooking();

        }

    }, []);

    const loadBooking = async () => {

        try {

            const response = await bookingService.getBookingById(id);

            const booking = response.data;

            setFormData({

                customerName: booking.customerName,
                email: booking.email,
                phone: booking.phone,
                vehicleNumber: booking.vehicleNumber,
                vehicleModel: booking.vehicleModel,
                serviceType: booking.serviceType,
                bookingDate: booking.bookingDate,
                notes: booking.notes || ""

            });

        } catch (error) {

            console.error(error);
            alert("Unable to load booking.");

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

        try {

            if (isEdit) {

                await bookingService.updateBooking(id, formData);

                alert("Booking Updated Successfully.");

            } else {

                await bookingService.createBooking(formData);

                alert("Booking Created Successfully.");

            }

            navigate("/admin/bookings");

        } catch (error) {

            console.error(error);

            alert("Something went wrong.");

        }

    };

    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2 p-0">

                    <Sidebar />

                </div>

                <div className="col-md-10 p-4">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h3>

                                {isEdit ? "Edit Booking" : "Add Booking"}

                            </h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Customer Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

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

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Phone
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />

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
                                            Vehicle Model
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="vehicleModel"
                                            value={formData.vehicleModel}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Service Type
                                        </label>

                                        <select
                                            className="form-select"
                                            name="serviceType"
                                            value={formData.serviceType}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Service
                                            </option>

                                            <option value="GENERAL_SERVICE">
                                                General Service
                                            </option>

                                            <option value="OIL_CHANGE">
                                                Oil Change
                                            </option>

                                            <option value="ENGINE_REPAIR">
                                                Engine Repair
                                            </option>

                                            <option value="BRAKE_SERVICE">
                                                Brake Service
                                            </option>

                                            <option value="BATTERY_REPLACEMENT">
                                                Battery Replacement
                                            </option>

                                            <option value="WHEEL_ALIGNMENT">
                                                Wheel Alignment
                                            </option>

                                            <option value="AC_SERVICE">
                                                AC Service
                                            </option>

                                            <option value="CAR_WASH">
                                                Car Wash
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Booking Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            name="bookingDate"
                                            value={formData.bookingDate}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Notes
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                    ></textarea>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary me-2"
                                >
                                    {isEdit ? "Update Booking" : "Save Booking"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate("/admin/bookings")}
                                >
                                    Cancel
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default BookingForm;