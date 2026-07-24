import { Link } from "react-router-dom";

function BookingTable({ bookings, onDelete }) {

    const getBadgeClass = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-secondary";

            case "CONFIRMED":
                return "bg-primary";

            case "IN_PROGRESS":
                return "bg-warning text-dark";

            case "COMPLETED":
                return "bg-success";

            case "CANCELLED":
                return "bg-danger";

            default:
                return "bg-dark";
        }

    };

    return (

        <div className="table-responsive">

            <table className="table table-striped table-hover align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Customer</th>

                        <th>Vehicle No.</th>

                        <th>Vehicle Model</th>

                        <th>Service</th>

                        <th>Date</th>

                        <th>Status</th>

                        <th className="text-center">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        bookings.length === 0 ?

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center text-muted py-4"
                                >
                                    No Bookings Found
                                </td>

                            </tr>

                            :

                            bookings.map((booking) => (

                                <tr key={booking.id}>

                                    <td>{booking.id}</td>

                                    <td>{booking.customerName}</td>

                                    <td>{booking.vehicleNumber}</td>

                                    <td>{booking.vehicleModel}</td>

                                    <td>
                                        {booking.serviceType.replaceAll("_", " ")}
                                    </td>

                                    <td>{booking.bookingDate}</td>

                                    <td>

                                        <span
                                            className={`badge ${getBadgeClass(booking.status)}`}
                                        >
                                            {booking.status.replaceAll("_", " ")}
                                        </span>

                                    </td>

                                    <td className="text-center">

                                        <Link
                                            to={`/admin/bookings/view/${booking.id}`}
                                            className="btn btn-info btn-sm me-2"
                                        >
                                            <i className="bi bi-eye"></i>
                                        </Link>

                                        <Link
                                            to={`/admin/bookings/edit/${booking.id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(booking)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default BookingTable;