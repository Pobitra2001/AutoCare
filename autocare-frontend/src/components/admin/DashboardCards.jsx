import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";

function DashboardCards() {

    const [dashboard, setDashboard] = useState({
        totalCustomers: 0,
        totalVehicles: 0,
        totalServiceRecords: 0,
        totalRevenue: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await dashboardService.getDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.error("Failed to load dashboard:", error);

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

    const cards = [

        {
            title: "Customers",
            value: dashboard.totalCustomers,
            icon: "bi-people-fill",
            color: "primary"
        },

        {
            title: "Vehicles",
            value: dashboard.totalVehicles,
            icon: "bi-car-front-fill",
            color: "success"
        },

        {
            title: "Service Records",
            value: dashboard.totalServiceRecords,
            icon: "bi-tools",
            color: "warning"
        },

        {
            title: "Revenue",
            value: `₹${dashboard.totalRevenue}`,
            icon: "bi-currency-rupee",
            color: "danger"
        }

    ];

    return (

        <div className="row">

            {

                cards.map(card => (

                    <div
                        className="col-lg-3 col-md-6 mb-4"
                        key={card.title}
                    >

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-muted mb-1">

                                            {card.title}

                                        </p>

                                        <h3>

                                            {card.value}

                                        </h3>

                                    </div>

                                    <div
                                        className={`bg-${card.color} text-white rounded-circle d-flex justify-content-center align-items-center`}
                                        style={{
                                            width: "60px",
                                            height: "60px"
                                        }}
                                    >

                                        <i className={`bi ${card.icon} fs-3`}></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default DashboardCards;