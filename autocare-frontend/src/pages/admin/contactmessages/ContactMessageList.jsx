import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import ContactMessageTable from "../../../components/admin/ContactMessageTable";
import DeleteContactMessageModal from "../../../components/admin/DeleteContactMessageModal";

import contactMessageService from "../../../services/contactMessageService";

function ContactMessageList() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {

        loadMessages();

    }, []);

    const loadMessages = async () => {

        try {

            setLoading(true);

            const response = await contactMessageService.getAllMessages();

            setMessages(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleDeleteClick = (message) => {

        setSelectedMessage(message);

        setShowDeleteModal(true);

    };

    const handleDeleteConfirm = async () => {

        try {

            await contactMessageService.deleteMessage(selectedMessage.id);

            setShowDeleteModal(false);

            setSelectedMessage(null);

            loadMessages();

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete message.");

        }

    };

    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2 p-0">

                    <Sidebar />

                </div>

                <div className="col-md-10 p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2>

                            <i className="bi bi-envelope-fill me-2"></i>

                            Contact Messages

                        </h2>

                    </div>

                    {

                        loading ?

                            <div className="text-center py-5">

                                <div className="spinner-border text-primary"></div>

                            </div>

                            :

                            <ContactMessageTable

                                messages={messages}

                                onDelete={handleDeleteClick}

                            />

                    }

                </div>

            </div>

            <DeleteContactMessageModal

                show={showDeleteModal}

                message={selectedMessage}

                onClose={() => setShowDeleteModal(false)}

                onConfirm={handleDeleteConfirm}

            />

        </div>

    );

}

export default ContactMessageList;