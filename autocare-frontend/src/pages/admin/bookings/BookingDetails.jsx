import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import bookingService from "../../../services/bookingService";

function BookingDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBooking();

    }, []);

    const loadBooking = async () => {

        try {

            const response = await bookingService.getBookingById(id);

            setBooking(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load booking.");

            navigate("/admin/bookings");

        } finally {

            setLoading(false);

        }

    };

    const badgeColor = (status) => {

        switch (status) {

            case "PENDING":
                return "secondary";

            case "CONFIRMED":
                return "primary";

            case "IN_PROGRESS":
                return "warning";

            case "COMPLETED":
                return "success";

            case "CANCELLED":
                return "danger";

            default:
                return "dark";
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

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2>

                            <i className="bi bi-calendar-check me-2"></i>

                            Booking Details

                        </h2>

                        <Link
                            to="/admin/bookings"
                            className="btn btn-secondary"
                        >

                            <i className="bi bi-arrow-left me-2"></i>

                            Back

                        </Link>

                    </div>

                    <div className="card shadow">

                        <div className="card-body">

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>

                                        <th width="250">Booking ID</th>

                                        <td>{booking.id}</td>

                                    </tr>

                                    <tr>

                                        <th>Customer Name</th>

                                        <td>{booking.customerName}</td>

                                    </tr>

                                    <tr>

                                        <th>Email</th>

                                        <td>{booking.email}</td>

                                    </tr>

                                    <tr>

                                        <th>Phone</th>

                                        <td>{booking.phone}</td>

                                    </tr>

                                    <tr>

                                        <th>Vehicle Number</th>

                                        <td>{booking.vehicleNumber}</td>

                                    </tr>

                                    <tr>

                                        <th>Vehicle Model</th>

                                        <td>{booking.vehicleModel}</td>

                                    </tr>

                                    <tr>

                                        <th>Service Type</th>

                                        <td>

                                            {booking.serviceType.replaceAll("_", " ")}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>Booking Date</th>

                                        <td>{booking.bookingDate}</td>

                                    </tr>

                                    <tr>

                                        <th>Status</th>

                                        <td>

                                            <span
                                                className={`badge bg-${badgeColor(booking.status)}`}
                                            >

                                                {booking.status.replaceAll("_", " ")}

                                            </span>

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>Notes</th>

                                        <td>

                                            {booking.notes || "-"}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>Created At</th>

                                        <td>{booking.createdAt}</td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default BookingDetails;