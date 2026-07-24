import { Link } from "react-router-dom";

function ContactMessageTable({

    messages,
    onDelete

}) {

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Subject</th>

                        <th>Created At</th>

                        <th width="180">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        messages.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center text-muted"
                                    >

                                        No Contact Messages Found

                                    </td>

                                </tr>

                            )

                            :

                            messages.map((message) => (

                                <tr key={message.id}>

                                    <td>

                                        {message.id}

                                    </td>

                                    <td>

                                        {message.name}

                                    </td>

                                    <td>

                                        {message.email}

                                    </td>

                                    <td>

                                        {message.subject}

                                    </td>

                                    <td>

                                        {

                                            message.createdAt ?

                                                new Date(message.createdAt)

                                                    .toLocaleString()

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td>

                                        <Link

                                            to={`/admin/contact-messages/view/${message.id}`}

                                            className="btn btn-info btn-sm me-2"

                                        >

                                            <i className="bi bi-eye"></i>

                                        </Link>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={() => onDelete(message)}

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

export default ContactMessageTable;