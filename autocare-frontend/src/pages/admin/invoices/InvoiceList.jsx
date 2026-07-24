import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import InvoiceTable from "../../../components/admin/InvoiceTable";
import DeleteInvoiceModal from "../../../components/admin/DeleteInvoiceModal";

import invoiceService from "../../../services/invoiceService";

function InvoiceList() {

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {

        loadInvoices();

    }, []);

    const loadInvoices = async () => {

        try {

            setLoading(true);

            const response = await invoiceService.getAllInvoices();

            setInvoices(response.data);

        } catch (error) {

            console.error("Error loading invoices:", error);

        } finally {

            setLoading(false);

        }

    };

    const handleDeleteClick = (invoice) => {

        setSelectedInvoice(invoice);

        setShowDeleteModal(true);

    };

    const handleDeleteConfirm = async () => {

        try {

            await invoiceService.deleteInvoice(selectedInvoice.id);

            setShowDeleteModal(false);

            setSelectedInvoice(null);

            loadInvoices();

        } catch (error) {

            console.error(error);

            alert("Unable to delete invoice.");

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

                            <i className="bi bi-receipt-cutoff me-2"></i>

                            Invoice Management

                        </h2>

                        <Link
                            to="/admin/invoices/add"
                            className="btn btn-primary"
                        >

                            <i className="bi bi-plus-circle me-2"></i>

                            Create Invoice

                        </Link>

                    </div>

                    {

                        loading ?

                            <div className="text-center py-5">

                                <div className="spinner-border text-primary"></div>

                            </div>

                            :

                            <InvoiceTable
                                invoices={invoices}
                                onDelete={handleDeleteClick}
                            />

                    }

                </div>

            </div>

            <DeleteInvoiceModal
                show={showDeleteModal}
                invoice={selectedInvoice}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />

        </div>

    );

}

export default InvoiceList;