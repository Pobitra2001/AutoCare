import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import About from "../pages/public/About";
import Services from "../pages/public/Services";
import Contact from "../pages/public/Contact";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/error/NotFound";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StaffDashboard from "../pages/staff/StaffDashboard";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerList from "../pages/admin/customers/CustomerList";
import CustomerForm from "../pages/admin/customers/CustomerForm";
import VehicleList from "../pages/admin/vehicles/VehicleList";
import VehicleForm from "../pages/admin/vehicles/VehicleForm";
import VehicleDetails from "../pages/admin/vehicles/VehicleDetails";
import BookingList from "../pages/admin/bookings/BookingList";
import BookingForm from "../pages/admin/bookings/BookingForm";
import BookingDetails from "../pages/admin/bookings/BookingDetails";




function AppRoutes() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            <Route
                path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/staff/dashboard" element={<StaffDashboard />} />
                <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                <Route
                     path="/admin/customers"
                     element={<CustomerList />}
                 />
                 <Route
                     path="/admin/customers/add"
                     element={<CustomerForm />}
                 />

                 <Route
                     path="/admin/customers/edit/:id"
                     element={<CustomerForm />}
                 />
                 <Route
                     path="/admin/vehicles"
                     element={<VehicleList />}
                 />

                 <Route
                     path="/admin/vehicles/add"
                     element={<VehicleForm />}
                 />
                 <Route
                       path="/admin/vehicles/edit/:id"
                       element={<VehicleForm />}
                 />
                 <Route
                     path="/admin/vehicles/view/:id"
                     element={<VehicleDetails />}
                 />
                 {/* Bookings */}

                            <Route
                                path="/admin/bookings"
                                element={<BookingList />}
                            />

                            <Route
                                path="/admin/bookings/add"
                                element={<BookingForm />}
                            />

                            <Route
                                path="/admin/bookings/view/:id"
                                element={<BookingDetails />}
                            />



            <Route path="*" element={<NotFound />} />

        </Routes>

    );
}

export default AppRoutes;



