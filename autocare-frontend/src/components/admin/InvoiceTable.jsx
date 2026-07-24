import { Link } from "react-router-dom";

function InvoiceTable({ invoices, onDelete }) {

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Invoice No</th>
                    <th>Service Charge</th>
                    <th>Parts Charge</th>
                    <th>Tax</th>
                    <th>Discount</th>
                    <th>Final Amount</th>
                    <th>Status</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    invoices.length === 0 ?

                        <tr>

                            <td
                                colSpan="11"
                                className="text-center text-muted"
                            >
                                No invoices found.
                            </td>

                        </tr>

                        :

                        invoices.map(invoice => (

                            <tr key={invoice.id}>

                                <td>{invoice.id}</td>

                                <td>{invoice.invoiceNumber}</td>

                                <td>₹ {invoice.serviceCharge}</td>

                                <td>₹ {invoice.partsCharge}</td>

                                <td>₹ {invoice.tax}</td>

                                <td>₹ {invoice.discount}</td>

                                <td className="fw-bold text-success">

                                    ₹ {invoice.finalAmount}

                                </td>

                                <td>

                                    <span
                                        className={`badge ${
                                            invoice.paymentStatus === "PAID"
                                                ? "bg-success"
                                                : invoice.paymentStatus === "PARTIALLY_PAID"
                                                    ? "bg-warning text-dark"
                                                    : "bg-danger"
                                        }`}
                                    >

                                        {invoice.paymentStatus}

                                    </span>

                                </td>

                                <td>{invoice.paymentMethod}</td>

                                <td>{invoice.invoiceDate}</td>

                                <td>

                                    <div className="btn-group">

                                        <Link
                                            to={`/admin/invoices/view/${invoice.id}`}
                                            className="btn btn-info btn-sm"
                                        >
                                            <i className="bi bi-eye"></i>
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(invoice)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                }

                </tbody>

            </table>

        </div>

    );

}

export default InvoiceTable;