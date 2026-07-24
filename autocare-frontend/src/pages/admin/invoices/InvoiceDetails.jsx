import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import invoiceService from "../../../services/invoiceService";

function InvoiceDetails() {

    const { id } = useParams();

    const [invoice, setInvoice] = useState(null);

    useEffect(() => {

        loadInvoice();

    }, []);

    const loadInvoice = async () => {

        try {

            const response = await invoiceService.getInvoiceById(id);

            setInvoice(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!invoice) {

        return <div className="text-center mt-5">Loading...</div>;

    }

    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2 p-0">

                    <Sidebar />

                </div>

                <div className="col-md-10 p-4">

                    <h2 className="mb-4">

                        Invoice Details

                    </h2>

                    <table className="table table-bordered">

                        <tbody>

                        <tr>

                            <th>ID</th>

                            <td>{invoice.id}</td>

                        </tr>

                        <tr>

                            <th>Invoice Number</th>

                            <td>{invoice.invoiceNumber}</td>

                        </tr>

                        <tr>

                            <th>Service Charge</th>

                            <td>₹ {invoice.serviceCharge}</td>

                        </tr>

                        <tr>

                            <th>Parts Charge</th>

                            <td>₹ {invoice.partsCharge}</td>

                        </tr>

                        <tr>

                            <th>Tax</th>

                            <td>₹ {invoice.tax}</td>

                        </tr>

                        <tr>

                            <th>Discount</th>

                            <td>₹ {invoice.discount}</td>

                        </tr>

                        <tr>

                            <th>Final Amount</th>

                            <td className="fw-bold text-success">

                                ₹ {invoice.finalAmount}

                            </td>

                        </tr>

                        <tr>

                            <th>Payment Status</th>

                            <td>{invoice.paymentStatus}</td>

                        </tr>

                        <tr>

                            <th>Payment Method</th>

                            <td>{invoice.paymentMethod}</td>

                        </tr>

                        <tr>

                            <th>Invoice Date</th>

                            <td>{invoice.invoiceDate}</td>

                        </tr>

                        <tr>

                            <th>Service Record ID</th>

                            <td>{invoice.serviceRecordId}</td>

                        </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/admin/invoices"
                        className="btn btn-secondary"
                    >

                        Back

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default InvoiceDetails;