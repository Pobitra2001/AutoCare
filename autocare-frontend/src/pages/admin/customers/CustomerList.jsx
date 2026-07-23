import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import CustomerTable from "../../../components/admin/CustomerTable";
import DeleteCustomerModal from "../../../components/admin/DeleteCustomerModal";

import customerService from "../../../services/customerService";

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {

        loadCustomers(page);

    }, [page]);

    const loadCustomers = async (pageNo) => {

        try {

            setLoading(true);

            const response =
                await customerService.getAllCustomers(pageNo, 10);

            setCustomers(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleDeleteClick = (customer) => {

        setSelectedCustomer(customer);
        setShowDeleteModal(true);

    };

    const handleDelete = async () => {

        try {

            setDeleteLoading(true);

            await customerService.deleteCustomer(selectedCustomer.id);

            setShowDeleteModal(false);

            loadCustomers(page);

        } catch (error) {

            alert(
                error.response?.data ||
                "Unable to delete customer."
            );

        } finally {

            setDeleteLoading(false);

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

                            Customer Management

                        </h2>

                        <Link
                            to="/admin/customers/add"
                            className="btn btn-primary"
                        >

                            <i className="bi bi-plus-circle me-2"></i>

                            Add Customer

                        </Link>

                    </div>

                    {

                        loading

                            ?

                            <div className="text-center">

                                <div className="spinner-border text-primary"></div>

                            </div>

                            :

                            <CustomerTable

                                customers={customers}

                                onDelete={handleDeleteClick}

                            />

                    }

                    <div className="d-flex justify-content-between mt-4">

                        <button

                            className="btn btn-outline-primary"

                            disabled={page === 0}

                            onClick={() => setPage(page - 1)}

                        >

                            Previous

                        </button>

                        <h5>

                            Page {page + 1} of {totalPages}

                        </h5>

                        <button

                            className="btn btn-outline-primary"

                            disabled={page + 1 >= totalPages}

                            onClick={() => setPage(page + 1)}

                        >

                            Next

                        </button>

                    </div>

                </div>

            </div>

            <DeleteCustomerModal

                show={showDeleteModal}

                customer={selectedCustomer}

                onClose={() => setShowDeleteModal(false)}

                onDelete={handleDelete}

                loading={deleteLoading}

            />

        </div>

    );

}

export default CustomerList;