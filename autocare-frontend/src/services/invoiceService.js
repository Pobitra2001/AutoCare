import api from "./api";

const invoiceService = {

    // Get all invoices
    getAllInvoices() {
        return api.get("/invoices");
    },

    // Get invoice by ID
    getInvoiceById(id) {
        return api.get(`/invoices/${id}`);
    },

    // Get invoice by invoice number
    getInvoiceByNumber(invoiceNumber) {
        return api.get(`/invoices/number/${invoiceNumber}`);
    },

    // Create invoice
    createInvoice(invoice) {
        return api.post("/invoices", invoice);
    },

    // Delete invoice
    deleteInvoice(id) {
        return api.delete(`/invoices/${id}`);
    }

};

export default invoiceService;