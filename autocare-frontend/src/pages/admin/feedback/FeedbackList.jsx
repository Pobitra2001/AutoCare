import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import FeedbackTable from "../../../components/admin/FeedbackTable";
import DeleteFeedbackModal from "../../../components/admin/DeleteFeedbackModal";

import feedbackService from "../../../services/feedbackService";

function FeedbackList() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedFeedback, setSelectedFeedback] = useState(null);

    useEffect(() => {

        loadFeedbacks();

    }, []);

    const loadFeedbacks = async () => {

        try {

            setLoading(true);

            const response = await feedbackService.getAllFeedback();

            setFeedbacks(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleDeleteClick = (feedback) => {

        setSelectedFeedback(feedback);

        setShowDeleteModal(true);

    };

    const handleDeleteConfirm = async () => {

        try {

            await feedbackService.deleteFeedback(selectedFeedback.id);

            setShowDeleteModal(false);

            loadFeedbacks();

        } catch (error) {

            console.error(error);

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

                            <i className="bi bi-chat-left-text me-2"></i>

                            Feedback Management

                        </h2>

                        <Link

                            to="/admin/feedback/add"

                            className="btn btn-primary"

                        >

                            <i className="bi bi-plus-circle me-2"></i>

                            Add Feedback

                        </Link>

                    </div>

                    {

                        loading ?

                            <div className="text-center">

                                <div className="spinner-border"></div>

                            </div>

                            :

                            <FeedbackTable

                                feedbacks={feedbacks}

                                onDelete={handleDeleteClick}

                            />

                    }

                </div>

            </div>

            <DeleteFeedbackModal

                show={showDeleteModal}

                feedback={selectedFeedback}

                onClose={() => setShowDeleteModal(false)}

                onConfirm={handleDeleteConfirm}

            />

        </div>

    );

}

export default FeedbackList;