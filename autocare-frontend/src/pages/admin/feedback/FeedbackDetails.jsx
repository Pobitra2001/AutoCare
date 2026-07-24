import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";

import feedbackService from "../../../services/feedbackService";

function FeedbackDetails() {

    const { id } = useParams();

    const [feedback, setFeedback] = useState(null);

    useEffect(() => {

        loadFeedback();

    }, []);

    const loadFeedback = async () => {

        try {

            const response = await feedbackService.getFeedbackById(id);

            setFeedback(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!feedback) {

        return <div className="text-center mt-5">Loading...</div>;

    }

    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2 p-0">

                    <Sidebar />

                </div>

                <div className="col-md-10 p-4">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h3>

                                Feedback Details

                            </h3>

                        </div>

                        <div className="card-body">

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>

                                        <th>ID</th>

                                        <td>{feedback.id}</td>

                                    </tr>

                                    <tr>

                                        <th>Customer ID</th>

                                        <td>{feedback.customerId}</td>

                                    </tr>

                                    <tr>

                                        <th>Rating</th>

                                        <td>{feedback.rating}</td>

                                    </tr>

                                    <tr>

                                        <th>Comment</th>

                                        <td>{feedback.comment}</td>

                                    </tr>

                                </tbody>

                            </table>

                            <Link

                                to="/admin/feedback"

                                className="btn btn-secondary"

                            >

                                Back

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default FeedbackDetails;
