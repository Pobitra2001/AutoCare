import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";

import feedbackService from "../../../services/feedbackService";

function FeedbackForm() {

    const navigate = useNavigate();

    const [feedback, setFeedback] = useState({

        rating: "",

        comment: "",

        customerId: ""

    });

    const handleChange = (e) => {

        setFeedback({

            ...feedback,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await feedbackService.createFeedback(feedback);

            alert("Feedback Added Successfully");

            navigate("/admin/feedback");

        }

        catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Error");

        }

    };

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

                                Add Feedback

                            </h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>

                                        Customer ID

                                    </label>

                                    <input

                                        type="number"

                                        className="form-control"

                                        name="customerId"

                                        value={feedback.customerId}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>

                                        Rating

                                    </label>

                                    <select

                                        className="form-select"

                                        name="rating"

                                        value={feedback.rating}

                                        onChange={handleChange}

                                    >

                                        <option value="">Select Rating</option>

                                        <option value="1">1</option>

                                        <option value="2">2</option>

                                        <option value="3">3</option>

                                        <option value="4">4</option>

                                        <option value="5">5</option>

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label>

                                        Comment

                                    </label>

                                    <textarea

                                        className="form-control"

                                        rows="5"

                                        name="comment"

                                        value={feedback.comment}

                                        onChange={handleChange}

                                    />

                                </div>

                                <button

                                    className="btn btn-success"

                                >

                                    Save Feedback

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default FeedbackForm;