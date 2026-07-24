import api from "./api";

const serviceRecordService = {

    // Get all service records
    getAllServiceRecords() {
        return api.get("/service-records");
    },

    // Get service record by id
    getServiceRecordById(id) {
        return api.get(`/service-records/${id}`);
    },

    // Create service record
    createServiceRecord(serviceRecord) {
        return api.post("/service-records", serviceRecord);
    },

    // Update service status
    updateServiceRecord(id, serviceRecord) {
        return api.put(
            `/service-records/${id}`,
            serviceRecord
        );
    },

    updateServiceStatus(id, status) {
        return api.patch(
            `/service-records/${id}/status?status=${status}`
        );
    },

    // Delete service record
    deleteServiceRecord(id) {
        return api.delete(`/service-records/${id}`);
    },

    // Get records by vehicle
    getByVehicle(vehicleId) {
        return api.get(`/service-records/vehicle/${vehicleId}`);
    },

    // Get records by status
    getByStatus(status) {
        return api.get(`/service-records/status/${status}`);
    }

};

export default serviceRecordService;