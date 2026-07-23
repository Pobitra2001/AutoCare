import api from "./api";

const dashboardService = {

    getDashboard() {
        return api.get("/dashboard");
    }

};

export default dashboardService;