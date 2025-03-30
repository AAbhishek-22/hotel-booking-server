/**
 * @file booking.Routes.ts
 * @description This file contains the routes for the booking system.
 * @module bookingRoutes
 */
import express,{ Router} from 'express';


const bookingRoutes: Router = express.Router();
import bookingController from '../controllers/bookingController';
const { createBooking, getAllBookings, getBookingById,
    updateBookingById, deleteBookingById, getBookingByUserEmail,
    getGuestList, cancelBooking, updateBookingCheckInAndCheckOut } = bookingController;

//BOOKING ROUTES 
bookingRoutes.post("/booking-room", createBooking);
bookingRoutes.get("/get-booking/:id", getBookingById);
bookingRoutes.get("/get-booking-by-email/:email", getBookingByUserEmail);
bookingRoutes.get("/get-current-guest-list", getGuestList);
bookingRoutes.delete("/cancel-booking", cancelBooking);
bookingRoutes.put("/update-booking-check-in-and-check-out", updateBookingCheckInAndCheckOut);



bookingRoutes.get("/get-all-bookings", getAllBookings);
bookingRoutes.put("/update-booking/:id", updateBookingById);
bookingRoutes.delete("/delete-booking/:id", deleteBookingById);


export default bookingRoutes;