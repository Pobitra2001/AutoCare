import { useAuth } from "../../context/AuthContext";

function Topbar() {

    const { user } = useAuth();

    return (

        <div className="bg-white shadow-sm px-4 py-3 d-flex justify-content-between align-items-center">

            <div>

                <h4 className="mb-0">
                    Dashboard
                </h4>

                <small className="text-muted">
                    Welcome back
                </small>

            </div>

            <div className="d-flex align-items-center">

                <i className="bi bi-bell fs-4 me-4"></i>

                <div className="text-end">

                    <strong>
                        {user?.fullName || "Admin"}
                    </strong>

                    <br />

                    <small className="text-muted">
                        {user?.role || "ADMIN"}
                    </small>

                </div>

            </div>

        </div>

    );

}

export default Topbar;