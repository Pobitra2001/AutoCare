import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import vehicleService from "../../../services/vehicleService";

function VehicleDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        loadVehicle();
    }, []);

    const loadVehicle = async () => {

        try {

            const response = await vehicleService.getVehicleById(id);

            setVehicle(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load vehicle.");

        }

    };

    if (!vehicle) {

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
                                <i className="bi bi-car-front-fill me-2"></i>
                                Vehicle Details
                            </h3>

                        </div>

                        <div className="card-body">

                            <p><strong>Vehicle Number:</strong> {vehicle.vehicleNumber}</p>
                            <p><strong>Brand:</strong> {vehicle.brand}</p>
                            <p><strong>Model:</strong> {vehicle.model}</p>
                            <p><strong>Color:</strong> {vehicle.color}</p>
                            <p><strong>Vehicle Type:</strong> {vehicle.vehicleType}</p>
                            <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
                            <p><strong>Manufacturing Year:</strong> {vehicle.manufacturingYear}</p>
                            <p><strong>Customer ID:</strong> {vehicle.customerId}</p>

                            <button
                                className="btn btn-secondary mt-3"
                                onClick={() => navigate("/admin/vehicles")}
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Back
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default VehicleDetails;