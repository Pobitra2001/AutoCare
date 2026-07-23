import { Link } from "react-router-dom";

function VehicleTable({ vehicles, onDelete }) {

    return (

        <div className="table-responsive">

            <table className="table table-striped table-hover align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Vehicle No.</th>

                        <th>Brand</th>

                        <th>Model</th>

                        <th>Type</th>

                        <th>Fuel</th>

                        <th>Year</th>

                        <th>Color</th>

                        <th>Customer ID</th>

                        <th className="text-center">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        vehicles.length === 0 ?

                            <tr>

                                <td
                                    colSpan="10"
                                    className="text-center text-muted"
                                >

                                    No Vehicles Found

                                </td>

                            </tr>

                            :

                            vehicles.map(vehicle => (

                                <tr key={vehicle.id}>

                                    <td>{vehicle.id}</td>

                                    <td>{vehicle.vehicleNumber}</td>

                                    <td>{vehicle.brand}</td>

                                    <td>{vehicle.model}</td>

                                    <td>{vehicle.vehicleType}</td>

                                    <td>{vehicle.fuelType}</td>

                                    <td>{vehicle.manufacturingYear}</td>

                                    <td>{vehicle.color}</td>

                                    <td>{vehicle.customerId}</td>

                                    <td className="text-center">

                                        <Link
                                            to={`/admin/vehicles/view/${vehicle.id}`}
                                            className="btn btn-info btn-sm me-2"
                                        >
                                            <i className="bi bi-eye"></i>
                                        </Link>

                                        <Link
                                            to={`/admin/vehicles/edit/${vehicle.id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(vehicle)}
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

export default VehicleTable;