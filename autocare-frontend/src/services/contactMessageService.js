import api from "./api";

const contactMessageService = {

    getAllMessages() {

        return api.get("/contact-messages");

    },

    getMessageById(id) {

        return api.get(`/contact-messages/${id}`);

    },

    createMessage(message) {

        return api.post("/contact-messages", message);

    },

    deleteMessage(id) {

        return api.delete(`/contact-messages/${id}`);

    }

};

export default contactMessageService;