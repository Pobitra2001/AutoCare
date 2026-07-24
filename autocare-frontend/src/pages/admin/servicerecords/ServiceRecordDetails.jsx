import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import serviceRecordService from "../../../services/serviceRecordService";

function ServiceRecordDetails() {

    const { id } = useParams();

    const [serviceRecord, setServiceRecord] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadServiceRecord();

    }, []);

    const loadServiceRecord = async () => {

        try {

            const response =
                await serviceRecordService.getServiceRecordById(id);

            setServiceRecord(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load Service Record.");

        } finally {

            setLoading(false);

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

                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                            <h4 className="mb-0">

                                <i className="bi bi-tools me-2"></i>

                                Service Record Details

                            </h4>

                            <Link
                                to="/admin/service-records"
                                className="btn btn-light btn-sm"
                            >

                                <i className="bi bi-arrow-left me-2"></i>

                                Back

                            </Link>

                        </div>

                        <div className="card-body">

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>

                                        <th width="30%">ID</th>

                                        <td>{serviceRecord.id}</td>

                                    </tr>

                                    <tr>

                                        <th>Service Type</th>

                                        <td>{serviceRecord.serviceType}</td>

                                    </tr>

                                    <tr>

                                        <th>Description</th>

                                        <td>

                                            {serviceRecord.description || "N/A"}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>Service Date</th>

                                        <td>{serviceRecord.serviceDate}</td>

                                    </tr>

                                    <tr>

                                        <th>Status</th>

                                        <td>

                                            <span
                                                className={`badge ${
                                                    serviceRecord.status === "COMPLETED"
                                                        ? "bg-success"
                                                        : serviceRecord.status === "IN_PROGRESS"
                                                        ? "bg-warning text-dark"
                                                        : serviceRecord.status === "CANCELLED"
                                                        ? "bg-danger"
                                                        : "bg-secondary"
                                                }`}
                                            >

                                                {serviceRecord.status}

                                            </span>

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>Vehicle ID</th>

                                        <td>{serviceRecord.vehicleId}</td>

                                    </tr>

                                    <tr>

                                        <th>Booking ID</th>

                                        <td>{serviceRecord.bookingId}</td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ServiceRecordDetails;