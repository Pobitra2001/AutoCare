function DeleteServiceRecordModal({

    show,
    serviceRecord,
    onClose,
    onConfirm

}) {

    if (!show) return null;

    return (

        <div
            className="modal show d-block"
            tabIndex="-1"
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header bg-danger text-white">

                        <h5 className="modal-title">

                            Delete Service Record

                        </h5>

                    </div>

                    <div className="modal-body">

                        <p>

                            Are you sure you want to delete

                            <strong>

                                {" "}#{serviceRecord?.id}

                            </strong>?

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

export default DeleteServiceRecordModal;