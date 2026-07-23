function DeleteVehicleModal({

    show,
    vehicle,
    onClose,
    onConfirm

}) {

    if (!show || !vehicle) return null;

    return (

        <>

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

                                <i className="bi bi-exclamation-triangle-fill me-2"></i>

                                Delete Vehicle

                            </h5>

                            <button
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            ></button>

                        </div>

                        <div className="modal-body">

                            <p className="mb-2">

                                Are you sure you want to delete this vehicle?

                            </p>

                            <div className="alert alert-warning mb-0">

                                <strong>Vehicle Number:</strong> {vehicle.vehicleNumber}

                                <br />

                                <strong>Brand:</strong> {vehicle.brand}

                                <br />

                                <strong>Model:</strong> {vehicle.model}

                            </div>

                            <p className="text-danger mt-3 mb-0">

                                <strong>This action cannot be undone.</strong>

                            </p>

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

                                Delete Vehicle

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default DeleteVehicleModal;