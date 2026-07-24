import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import ServiceRecordTable from "../../../components/admin/ServiceRecordTable";
import DeleteServiceRecordModal from "../../../components/admin/DeleteServiceRecordModal";
import serviceRecordService from "../../../services/serviceRecordService";

function ServiceRecordList() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {

        loadRecords();

    }, []);

    const loadRecords = async () => {

        try {

            setLoading(true);

            const response =
                await serviceRecordService.getAllServiceRecords();

            setRecords(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleDeleteClick = (record) => {

        setSelectedRecord(record);

        setShowDeleteModal(true);

    };

    const handleDeleteConfirm = async () => {

        try {

            await serviceRecordService.deleteServiceRecord(selectedRecord.id);

            setShowDeleteModal(false);

            setSelectedRecord(null);

            loadRecords();

        } catch (error) {

            console.error(error);

            alert("Unable to delete service record.");

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

                            <i className="bi bi-wrench-adjustable-circle me-2"></i>

                            Service Records

                        </h2>

                        <Link
                            to="/admin/servicerecords/add"
                            className="btn btn-primary"
                        >

                            <i className="bi bi-plus-circle me-2"></i>

                            Add Service Record

                        </Link>

                    </div>

                    {

                        loading ?

                            <div className="text-center py-5">

                                <div className="spinner-border text-primary"></div>

                            </div>

                            :

                            <ServiceRecordTable
                                records={records}
                                onDelete={handleDeleteClick}
                            />

                    }

                </div>

            </div>

            <DeleteServiceRecordModal
                show={showDeleteModal}
                serviceRecord={selectedRecord}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />

        </div>

    );

}

export default ServiceRecordList;