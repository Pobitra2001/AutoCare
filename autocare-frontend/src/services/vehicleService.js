import api from "./api";

const vehicleService = {

    getAllVehicles() {
        return api.get("/vehicles");
    },

    getVehicleById(id) {
        return api.get(`/vehicles/${id}`);
    },

    createVehicle(data) {
        return api.post("/vehicles", data);
    },

    updateVehicle(id, data) {
        return api.put(`/vehicles/${id}`, data);
    },

    deleteVehicle(id) {
        return api.delete(`/vehicles/${id}`);
    }

};

export default vehicleService;