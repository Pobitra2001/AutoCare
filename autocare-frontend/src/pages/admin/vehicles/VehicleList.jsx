import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar";
import VehicleTable from "../../../components/admin/VehicleTable";
import DeleteVehicleModal from "../../../components/admin/DeleteVehicleModal";
import vehicleService from "../../../services/vehicleService";

function VehicleList() {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {

        loadVehicles();

    }, []);

    const loadVehicles = async () => {

        try {

            setLoading(true);

            const response = await vehicleService.getAllVehicles();

            setVehicles(response.data);

        } catch (error) {

            console.error("Error loading vehicles", error);

        } finally {

            setLoading(false);

        }

    };

    const handleDeleteClick = (vehicle) => {

        setSelectedVehicle(vehicle);

        setShowDeleteModal(true);

    };

    const handleDeleteConfirm = async () => {

        try {

            await vehicleService.deleteVehicle(selectedVehicle.id);

            setShowDeleteModal(false);

            setSelectedVehicle(null);

            loadVehicles();

        } catch (error) {

            console.error(error);

            alert("Unable to delete vehicle.");

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

                            <i className="bi bi-car-front-fill me-2"></i>

                            Vehicle Management

                        </h2>

                        <Link
                            to="/admin/vehicles/add"
                            className="btn btn-primary"
                        >

                            <i className="bi bi-plus-circle me-2"></i>

                            Add Vehicle

                        </Link>

                    </div>

                    {

                        loading ?

                            <div className="text-center py-5">

                                <div className="spinner-border text-primary"></div>

                            </div>

                            :

                            <VehicleTable
                                vehicles={vehicles}
                                onDelete={handleDeleteClick}
                            />

                    }

                </div>

            </div>

            <DeleteVehicleModal
                show={showDeleteModal}
                vehicle={selectedVehicle}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />

        </div>

    );

}

export default VehicleList;