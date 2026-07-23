import api from "./api";

const customerService = {

    getAllCustomers(page = 0, size = 5) {
        return api.get(`/customers?page=${page}&size=${size}`);
    },

    getCustomerById(id) {
        return api.get(`/customers/${id}`);
    },

    createCustomer(data) {
        return api.post("/customers", data);
    },

    updateCustomer(id, data) {
        return api.put(`/customers/${id}`, data);
    },

    deleteCustomer(id) {
        return api.delete(`/customers/${id}`);
    }

};

export default customerService;