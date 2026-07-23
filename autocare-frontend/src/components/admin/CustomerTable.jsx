import { Link } from "react-router-dom";

function CustomerTable({ customers,onDelete }) {

    return (

        <div className="table-responsive">

            <table className="table table-striped table-hover align-middle">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Phone</th>

                    <th>Email</th>

                    <th>Address</th>

                    <th>Created</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    customers.length === 0 ?

                        <tr>

                            <td
                                colSpan="7"
                                className="text-center"
                            >
                                No Customers Found
                            </td>

                        </tr>

                        :

                        customers.map(customer => (

                            <tr key={customer.id}>

                                <td>{customer.id}</td>

                                <td>{customer.name}</td>

                                <td>{customer.phone}</td>

                                <td>{customer.email}</td>

                                <td>{customer.address}</td>

                                <td>

                                    {new Date(customer.createdAt)
                                        .toLocaleDateString()}

                                </td>

                                <td>

                                    <button className="btn btn-info btn-sm me-2">

                                        <i className="bi bi-eye"></i>

                                    </button>

                                    <Link
                                        to={`/admin/customers/edit/${customer.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onDelete(customer)}
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

export default CustomerTable;