function DeleteCustomerModal({

    show,
    customer,
    onClose,
    onDelete,
    loading

}) {

    if (!show) return null;

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

                    <div className="modal-header">

                        <h5 className="modal-title">

                            Delete Customer

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <p>

                            Are you sure you want to delete

                            <strong>

                                {" "}

                                {customer?.name}

                            </strong>

                            ?

                        </p>

                        <p className="text-danger mb-0">

                            This action cannot be undone.

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
                            onClick={onDelete}
                            disabled={loading}
                        >

                            {

                                loading

                                    ? "Deleting..."

                                    : "Delete"

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DeleteCustomerModal;