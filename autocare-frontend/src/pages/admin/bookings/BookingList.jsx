import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";
import BookingTable from "../../../components/admin/BookingTable";
import DeleteBookingModal from "../../../components/admin/DeleteBookingModal";
import bookingService from "../../../services/bookingService";

function BookingList() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            setLoading(true);

            const response = await bookingService.getAllBookings();

            setBookings(response.data);

        } catch (error) {

            console.error("Error loading bookings", error);

        } finally {

            setLoading(false);

        }

    };

    const handleDeleteClick = (booking) => {

        setSelectedBooking(booking);

        setShowDeleteModal(true);

    };

    const handleDeleteConfirm = async () => {

        try {

            await bookingService.deleteBooking(selectedBooking.id);

            setShowDeleteModal(false);

            setSelectedBooking(null);

            loadBookings();

        } catch (error) {

            console.error(error);

            alert("Unable to delete booking.");

        }

    };

    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2 p-0">

                    <Sidebar />

                </div>

                <div className="col-md-10 p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2>

                            <i className="bi bi-calendar-check me-2"></i>

                            Booking Management

                        </h2>

                        <Link
                            to="/admin/bookings/add"
                            className="btn btn-primary"
                        >

                            <i className="bi bi-plus-circle me-2"></i>

                            Add Booking

                        </Link>

                    </div>

                    {

                        loading ?

                            <div className="text-center py-5">

                                <div className="spinner-border text-primary"></div>

                            </div>

                            :

                            <BookingTable
                                bookings={bookings}
                                onDelete={handleDeleteClick}
                            />

                    }

                </div>

            </div>

            <DeleteBookingModal
                show={showDeleteModal}
                booking={selectedBooking}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />

        </div>

    );

}

export default BookingList;