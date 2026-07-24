import api from "./api";

const bookingService = {

    // Get all bookings
    getAllBookings() {
        return api.get("/bookings");
    },

    // Get booking by ID
    getBookingById(id) {
        return api.get(`/bookings/${id}`);
    },

    // Create booking
    createBooking(booking) {
        return api.post("/bookings", booking);
    },

    // Update booking status
    updateBookingStatus(id, status) {
        return api.put(
            `/bookings/${id}/status?status=${status}`
        );
    },

    // Delete booking
    deleteBooking(id) {
        return api.delete(`/bookings/${id}`);
    },

    // Get bookings by email
    getBookingsByEmail(email) {
        return api.get(`/bookings/email/${email}`);
    },

    // Get bookings by status
    getBookingsByStatus(status) {
        return api.get(`/bookings/status/${status}`);
    }

};

export default bookingService;