import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import invoiceService from "../../../services/invoiceService";

function InvoiceForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);

    const [invoice, setInvoice] = useState({

        serviceCharge: "",

        partsCharge: "",

        tax: "",

        discount: "",

        paymentStatus: "UNPAID",

        paymentMethod: "CASH",

        invoiceDate: "",

        serviceRecordId: ""

    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (isEdit) {

            loadInvoice();

        }

    }, [id]);

    const loadInvoice = async () => {

        try {

            setLoading(true);

            const response = await invoiceService.getInvoiceById(id);

            setInvoice({

                serviceCharge: response.data.serviceCharge,

                partsCharge: response.data.partsCharge,

                tax: response.data.tax,

                discount: response.data.discount,

                paymentStatus: response.data.paymentStatus,

                paymentMethod: response.data.paymentMethod,

                invoiceDate: response.data.invoiceDate,

                serviceRecordId: response.data.serviceRecordId

            });

        } catch (error) {

            console.error(error);

            alert("Unable to load invoice.");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setInvoice({

            ...invoice,

            [e.target.name]: e.target.value

        });

    };

    const finalAmount =

        (Number(invoice.serviceCharge) || 0)

        +

        (Number(invoice.partsCharge) || 0)

        +

        (Number(invoice.tax) || 0)

        -

        (Number(invoice.discount) || 0);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (isEdit) {

                await invoiceService.updateInvoice(id, invoice);

                alert("Invoice Updated Successfully.");

            } else {

                await invoiceService.createInvoice(invoice);

                alert("Invoice Created Successfully.");

            }

            navigate("/admin/invoices");

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Operation Failed");

        }

    };

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

            </div>

        );

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

                                {

                                    isEdit

                                        ?

                                        "Edit Invoice"

                                        :

                                        "Create Invoice"

                                }

                            </h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Service Charge

                                        </label>

                                        <input

                                            type="number"

                                            className="form-control"

                                            name="serviceCharge"

                                            value={invoice.serviceCharge}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Parts Charge

                                        </label>

                                        <input

                                            type="number"

                                            className="form-control"

                                            name="partsCharge"

                                            value={invoice.partsCharge}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Tax

                                        </label>

                                        <input

                                            type="number"

                                            className="form-control"

                                            name="tax"

                                            value={invoice.tax}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Discount

                                        </label>

                                        <input

                                            type="number"

                                            className="form-control"

                                            name="discount"

                                            value={invoice.discount}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Payment Status

                                        </label>

                                        <select

                                            className="form-select"

                                            name="paymentStatus"

                                            value={invoice.paymentStatus}

                                            onChange={handleChange}

                                        >

                                            <option value="PAID">PAID</option>

                                            <option value="UNPAID">UNPAID</option>

                                            <option value="PARTIALLY_PAID">

                                                PARTIALLY PAID

                                            </option>

                                        </select>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Payment Method

                                        </label>

                                        <select

                                            className="form-select"

                                            name="paymentMethod"

                                            value={invoice.paymentMethod}

                                            onChange={handleChange}

                                        >

                                            <option value="CASH">CASH</option>

                                            <option value="CARD">CARD</option>

                                            <option value="UPI">UPI</option>

                                            <option value="NET_BANKING">

                                                NET BANKING

                                            </option>

                                        </select>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Invoice Date

                                        </label>

                                        <input

                                            type="date"

                                            className="form-control"

                                            name="invoiceDate"

                                            value={invoice.invoiceDate}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Service Record ID

                                        </label>

                                        <input

                                            type="number"

                                            className="form-control"

                                            name="serviceRecordId"

                                            value={invoice.serviceRecordId}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                    <div className="col-md-12 mb-4">

                                        <label className="form-label fw-bold">

                                            Final Amount

                                        </label>

                                        <input

                                            type="text"

                                            className="form-control bg-light"

                                            value={finalAmount.toFixed(2)}

                                            readOnly

                                        />

                                    </div>

                                </div>

                                <button

                                    type="submit"

                                    className="btn btn-success me-2"

                                >

                                    {

                                        isEdit

                                            ?

                                            "Update Invoice"

                                            :

                                            "Create Invoice"

                                    }

                                </button>

                                <button

                                    type="button"

                                    className="btn btn-secondary"

                                    onClick={() => navigate("/admin/invoices")}

                                >

                                    Cancel

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default InvoiceForm;