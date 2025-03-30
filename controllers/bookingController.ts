/**
 * @description Booking Controller
 * @module bookingController
 * @requires express
 */

import { Request, Response } from "express";
import Booking from "../models/bookingModel";
import apiResponse from "../responses/apiResponse";
import BookingDB from "../database/booking.DB";
import HotelDB from "../database/hotel.db";
import BookingService from "../services/booking.Service";
import { AuthenticatedRequest } from "../interfaces/UserInterFace";
import mongoose from "mongoose";
import CommonUtils from "../utils/common.utils";

import { UserDB } from "../database/user.db";
import { IHotel } from "../interfaces/hotelInterfaces";
import { IBooking, IBookingInfo } from "../interfaces/bookingInterface";

class BookingController {
    /**
     * Create a new booking
     * @param req - The request object
     * @param res - The response object
     */
    public static async createBooking(req: AuthenticatedRequest, res: Response): Promise<any> {
        try {
            const {  userId, checkIn, checkOut, totalAmount, nameOfGuests } = req.body;

            const rooms: IHotel[] | null = await HotelDB.getAvailableRoomList();
            const roomExists: IHotel | null = rooms && rooms.length > 0 ? rooms[0] : null;
            if (roomExists?.roomStatus === "Booked") {
                return apiResponse.badRequestResponse(res, "Room is already booked");
            }
    
            if (!roomExists || roomExists == null || roomExists == undefined) {
                return apiResponse.badRequestResponse(res, "No available rooms");
            }
            //now select any roomNumber from the available room list
            const randomRoom = rooms && rooms.length > 0 ? rooms[Math.floor(Math.random() * rooms.length)] : null;
            const roomId = randomRoom?._id;
            const bookingInfo = new Booking({
                userId,
                roomId,
                roomNumber: randomRoom ? randomRoom.roomNumber : null,
                totalAmount,
                nameOfGuests,
                checkIn: CommonUtils.convertToDate(checkIn),
                checkOut: CommonUtils.convertToDate(checkOut),
                // checkIn,
                // checkOut,

            });
                       
            const booking = await BookingService.createBooking(bookingInfo);
            if (!booking || booking == null || booking == undefined) {
                return apiResponse.badRequestResponse(res, "Booking creation failed");
            }
            return apiResponse.successResponseWithData(res, "Booking created successfully", booking);
        } catch (error: any) {
            console.error("Error creating booking", error);
            apiResponse.serverErrorResponse(res, error);
        }
    }
    /**
     * Get all bookings
     * @param req - The request object
     * @param res - The response object
     */
    public static async getAllBookings(req: Request, res: Response): Promise<any> {
        try {
            const bookings = await BookingDB.getAllBookings();
            if (!bookings || bookings == null || bookings == undefined) {
                return apiResponse.badRequestResponse(res, "No bookings found");
            }
            return apiResponse.successResponseWithData(res, "Bookings fetched successfully", bookings);
        } catch (error: any) {
            console.error("Error fetching bookings", error);
            apiResponse.serverErrorResponse(res, error);
        }
    }
    /**
     * Get booking by ID
     * @param req - The request object
     * @param res - The response object
     */
    public static async getBookingById(req: Request, res: Response): Promise<any> {
        try {
            const bookingId = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(bookingId)) {
                return apiResponse.badRequestResponse(res, "Invalid booking ID");
            }
            const booking = await BookingDB.getBookingById(bookingId);
            if (!booking || booking == null || booking == undefined) {
                return apiResponse.badRequestResponse(res, "No booking found");
            }
            return apiResponse.successResponseWithData(res, "Booking fetched successfully", booking);
        } catch (error: any) {
            console.error("Error fetching booking", error);
            apiResponse.serverErrorResponse(res, error);
        }
    }
    /**
     * Update booking by ID
     * @param req - The request object
     * @param res - The response object
     * @param id - The booking ID
     * @returns {Promise<any>} - The updated booking object
     * 
     */
    public static async updateBookingById(req: Request, res: Response): Promise<any> {
        try {
            const bookingId = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(bookingId)) {
                return apiResponse.badRequestResponse(res, "Invalid booking ID");
            }
            const updatedBooking = await BookingDB.updateBookingById(bookingId, req.body);
            if (!updatedBooking || updatedBooking == null || updatedBooking == undefined) {
                return apiResponse.badRequestResponse(res, "Booking update failed");
            }
            return apiResponse.successResponseWithData(res, "Booking updated successfully", updatedBooking);
        } catch (error: any) {
            console.error("Error updating booking", error);
            apiResponse.serverErrorResponse(res, error);
        }
    }
    /**
     * Delete booking by ID
     * @param req - The request object
     * @param res - The response object
     * @param id - The booking ID
     * @returns {Promise<any>} - The deleted booking object
     * 
     */
     
    public static async deleteBookingById(req: Request, res: Response): Promise<any> {
        try {
            const bookingId = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(bookingId)) {
                return apiResponse.badRequestResponse(res, "Invalid booking ID");
            }
            const deletedBooking = await BookingDB.deleteBookingByEmailRoomNumberId(bookingId);
            if (!deletedBooking || deletedBooking == null || deletedBooking == undefined) {
                return apiResponse.badRequestResponse(res, "Booking deletion failed");
            }
            return apiResponse.successResponseWithData(res, "Booking deleted successfully", deletedBooking);
        } catch (error: any) {
            console.error("Error deleting booking", error);
            apiResponse.serverErrorResponse(res, error);
        }
    }
    /**
     * Get Booking details by user
     * User will be able to see his/her booking details by emails 
     */
    public static async getBookingByUserEmail(req: AuthenticatedRequest, res: Response): Promise<any> {
        try {
            const userEmail = req.params.email;
            const user = await UserDB.fetchUserByEmailMobileId(userEmail);
            if (!user || user == null || user == undefined) {
                return apiResponse.badRequestResponse(res, "You are not registered");
            }
           const booking = await BookingService.getBookingsByUserId(user._id as string);
            if (!booking || booking == null || booking == undefined || booking.length === 0) {
                return apiResponse.badRequestResponse(res, "OOPs, You have no bookings.");
            }
            return apiResponse.successResponseWithData(res, "Upcoming bookings fetched successfully", booking);
        } catch (error: any) {
            console.error("Error fetching booking by user email", error);
            apiResponse.serverErrorResponse(res, error);
        }
    }
    /**
     * Get guest list currently staying in the hotel
     * @param req - The request object
     * @param res - The response object
     * @returns {Promise<any>} - The list of guests
     */
    public static async getGuestList(req: Request, res: Response): Promise<any> {
        try {
            const bookings = await BookingDB.getAllBookings();
            if (!bookings || bookings == null || bookings == undefined) {
                return apiResponse.badRequestResponse(res, "No bookings found");
            }
            const guestList = bookings.map((booking: IBooking) => ({
                nameOfGuests: booking.nameOfGuests,
                roomNumber: booking.roomNumber,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
            }));
            return apiResponse.successResponseWithData(res, "Guest list fetched successfully", guestList);
        } catch (error: any) {
            console.error("Error fetching guest list", error);
            apiResponse.serverErrorResponse(res, error);
        }
    }
    /**
     * Cancel booking 
     * @param req - The request object
     * @param res - The response object
     */
    public static async cancelBooking(req: AuthenticatedRequest, res: Response): Promise<any> {
        try {
            const { roomNumber, email } = req.body;
            const user = await UserDB.fetchUserByEmailMobileId(email);
            if (!user || user == null || user == undefined) {
                return apiResponse.badRequestResponse(res, "You are not registered");
            }
            const bookingInfo: IBookingInfo = {
                roomNumber: roomNumber,
                email: email,
                userId: user._id as string
            }
            const canceledBooking= await BookingService.deleteBookingByEmailRoomNumberId(bookingInfo);
            if (!canceledBooking || canceledBooking == null || canceledBooking == undefined) {
                return apiResponse.badRequestResponse(res, " No bookings for cancellation");
            }
            //cancel booking update room status to available
            const roomInfo = {
                _id: canceledBooking.roomId,
                roomNumber: canceledBooking.roomNumber,
                roomStatus: "Available"
            }
            const roomCancelledStaus = await BookingDB.updateRoomStatus(roomInfo);
            return apiResponse.successResponseWithData(res, "Booking cancelled successfully", canceledBooking);
        } catch (error: any) {
            console.error("Error cancelling booking", error);
            apiResponse.serverErrorResponse(res, error);
        }
    } 

    /**
     * Uopdate booking checkin and checkout by email and room number
     * @param req - The request object
     * @param res - The response object
     *
     */
    public static async updateBookingCheckInAndCheckOut(req: AuthenticatedRequest, res: Response): Promise<any> {
        try {
            const { roomNumber, email, checkIn, checkOut } = req.body;


            const user = await UserDB.fetchUserByEmailMobileId(email);
            if (!user || user == null || user == undefined) {
                return apiResponse.badRequestResponse(res, "You are not registered");
            }
            const bookingInfo: IBookingInfo = {
                roomNumber: roomNumber,
                email: email,
                userId: user._id as string,
                checkIn: checkIn,
                checkOut: checkOut
            }
            const updatedBooking = await BookingService.updateBookingCheckInAndCheckOut(bookingInfo);
            if (!updatedBooking || updatedBooking == null || updatedBooking == undefined) {
                return apiResponse.badRequestResponse(res, "No bookings for update");
            }
            return apiResponse.successResponseWithData(res, "Booking updated successfully", updatedBooking);
        } catch (error: any) {
            console.error("Error updating booking", error);
            apiResponse.serverErrorResponse(res, error);
        }
    }

}
export default BookingController;