import api from "./api";

const feedbackService = {

    getAllFeedback() {
        return api.get("/feedback");
    },

    getFeedbackById(id) {
        return api.get(`/feedback/${id}`);
    },

    createFeedback(feedback) {
        return api.post("/feedback", feedback);
    },

    updateFeedback(id, feedback) {
        return api.put(`/feedback/${id}`, feedback);
    },

    deleteFeedback(id) {
        return api.delete(`/feedback/${id}`);
    },

    getFeedbackByCustomer(customerId) {
        return api.get(`/feedback/customer/${customerId}`);
    },

    getFeedbackByRating(rating) {
        return api.get(`/feedback/rating/${rating}`);
    }

};

export default feedbackService;