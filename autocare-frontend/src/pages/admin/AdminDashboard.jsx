import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import DashboardCards from "../../components/admin/DashboardCards";

function AdminDashboard() {

    return (

        <div className="d-flex bg-light">

            <Sidebar />

            <div className="flex-grow-1">

                <Topbar />

                <div className="p-4">

                    <DashboardCards />

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;