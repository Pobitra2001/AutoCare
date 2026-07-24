import { Link } from "react-router-dom";

function ServiceRecordTable({ records, onDelete }) {

    const badgeColor = (status) => {

        switch (status) {

            case "PENDING":
                return "secondary";

            case "IN_PROGRESS":
                return "warning";

            case "COMPLETED":
                return "success";

            case "CANCELLED":
                return "danger";

            default:
                return "primary";

        }

    };

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Service Type</th>

                        <th>Vehicle ID</th>

                        <th>Booking ID</th>

                        <th>Service Date</th>

                        <th>Status</th>

                        <th className="text-center">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        records.length === 0 ?

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center text-muted"
                                >

                                    No Service Records Found

                                </td>

                            </tr>

                            :

                            records.map(record => (

                                <tr key={record.id}>

                                    <td>{record.id}</td>

                                    <td>{record.serviceType}</td>

                                    <td>{record.vehicleId}</td>

                                    <td>{record.bookingId}</td>

                                    <td>{record.serviceDate}</td>

                                    <td>

                                        <span className={`badge bg-${badgeColor(record.status)}`}>

                                            {record.status}

                                        </span>

                                    </td>

                                    <td className="text-center">

                                        <Link
                                            to={`/admin/servicerecords/view/${record.id}`}
                                            className="btn btn-info btn-sm me-2"
                                        >

                                            <i className="bi bi-eye"></i>

                                        </Link>

                                        <Link
                                            to={`/admin/servicerecords/edit/${record.id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >

                                            <i className="bi bi-pencil"></i>

                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(record)}
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

export default ServiceRecordTable;