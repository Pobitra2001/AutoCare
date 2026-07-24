import { Link } from "react-router-dom";

function FeedbackTable({ feedbacks, onDelete }) {

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Customer ID</th>

                        <th>Rating</th>

                        <th>Comment</th>

                        <th width="180">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        feedbacks.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center text-muted"
                                    >

                                        No Feedback Found

                                    </td>

                                </tr>

                            )

                            :

                            feedbacks.map((feedback) => (

                                <tr key={feedback.id}>

                                    <td>

                                        {feedback.id}

                                    </td>

                                    <td>

                                        {feedback.customerId}

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                feedback.rating >= 4
                                                    ? "bg-success"
                                                    : feedback.rating === 3
                                                        ? "bg-warning text-dark"
                                                        : "bg-danger"
                                            }`}
                                        >

                                            {feedback.rating} ★

                                        </span>

                                    </td>

                                    <td>

                                        {feedback.comment}

                                    </td>

                                    <td>

                                        <Link

                                            to={`/admin/feedback/view/${feedback.id}`}

                                            className="btn btn-info btn-sm me-2"

                                        >

                                            <i className="bi bi-eye"></i>

                                        </Link>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={() => onDelete(feedback)}

                                        >

                                            <i className="bi bi-trash"></i>

                                        </button>

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default FeedbackTable;