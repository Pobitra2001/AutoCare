function DeleteInvoiceModal({

    show,
    invoice,
    onClose,
    onConfirm

}) {

    if (!show || !invoice) {

        return null;

    }

    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                background: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header bg-danger text-white">

                        <h5 className="modal-title">

                            Delete Invoice

                        </h5>

                    </div>

                    <div className="modal-body">

                        <p>

                            Are you sure you want to delete Invoice

                            <strong>

                                {" "}
                                {invoice.invoiceNumber}
                                {" "}

                            </strong>

                            ?

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

                            Delete

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DeleteInvoiceModal;