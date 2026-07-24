function DeleteBookingModal({

    show,
    booking,
    onClose,
    onConfirm

}) {

    if (!show || !booking) return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header bg-danger text-white">

                        <h5 className="modal-title">

                            <i className="bi bi-trash me-2"></i>

                            Delete Booking

                        </h5>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <p>

                            Are you sure you want to delete this booking?

                        </p>

                        <table className="table table-bordered">

                            <tbody>

                                <tr>

                                    <th>Customer</th>

                                    <td>{booking.customerName}</td>

                                </tr>

                                <tr>

                                    <th>Vehicle</th>

                                    <td>{booking.vehicleNumber}</td>

                                </tr>

                                <tr>

                                    <th>Service</th>

                                    <td>
                                        {booking.serviceType.replaceAll("_", " ")}
                                    </td>

                                </tr>

                                <tr>

                                    <th>Date</th>

                                    <td>{booking.bookingDate}</td>

                                </tr>

                            </tbody>

                        </table>

                        <div className="alert alert-warning">

                            <i className="bi bi-exclamation-triangle-fill me-2"></i>

                            This action cannot be undone.

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >

                            <i className="bi bi-trash me-2"></i>

                            Delete

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DeleteBookingModal;