function DeleteContactMessageModal({

    show,
    message,
    onClose,
    onConfirm

}) {

    if (!show || !message) {

        return null;

    }

    return (

        <div

            className="modal d-block"

            style={{ backgroundColor: "rgba(0,0,0,.5)" }}

        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header bg-danger text-white">

                        <h5>

                            Delete Contact Message

                        </h5>

                    </div>

                    <div className="modal-body">

                        <p>

                            Are you sure you want to delete this contact message?

                        </p>

                        <p>

                            <strong>

                                {message.subject}

                            </strong>

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

export default DeleteContactMessageModal;