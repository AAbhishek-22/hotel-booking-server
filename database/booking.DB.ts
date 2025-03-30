/**
 * @description This file contains the database connection and schema for the booking system.
 * @module bookingDB
 */
import mongoose, { Document } from 'mongoose';
import { IBooking, IBookingInfo } from '../interfaces/bookingInterface';
import { IHotel } from '../interfaces/hotelInterfaces';
import Booking from '../models/bookingModel';
import hotelModel from '../models/hotelModel';
import helperService from '../helpers/helper.service';


class BookingDB {
    /**
     * Create a new booking
     * @param bookingInfo - The booking information
     * @returns The created booking
     */
    public static async createBooking(bookingInfo: IBooking): Promise<IBooking | null> {
        try {
            const booking = await Booking.create(bookingInfo);
            if (!booking) {
                throw new Error("Booking creation failed");
            }
            return booking;
        } catch (error) {
            console.error("Error creating booking", error);
            throw error;
        }
    }
    /**
     * Get all bookings
     * @returns All bookings
     */
    public static async getAllBookings(): Promise<IBooking[] | null> {
        try {
            const bookings = await Booking.find();
            return bookings;
        } catch (error) {
            console.error("Error fetching bookings", error);
            throw error;
        }
    }
    /**
     * Get booking by ID
     * @param bookingId - The ID of the booking
     * @returns The booking with the specified ID
     */

    
public static async getBookingById(bookingId: string): Promise<IBooking | null> {
    try{
        const booking = await Booking.findById(bookingId);
        return booking;
    }catch(error){
        console.error("Error fetching booking", error);
        throw error;
    }
    }
    /**
     * Update booking by ID
     * @param bookingId - The ID of the booking
     * @param bookingInfo - The updated booking information
     * @returns The updated booking
     */
    public static async updateBookingById(bookingId: string, bookingInfo: IBooking): Promise<IBooking | null> {
        try{
            const booking = await Booking.findByIdAndUpdate(bookingId, bookingInfo, { new: true });
            return booking;
        }catch(error){
            console.error("Error updating booking", error);
            throw error;
        }
    }
    /**
     * Delete booking by ID
     * @param bookingId - The ID of the booking
     * @returns The deleted booking
     */
    public static async deleteBookingByEmailRoomNumberId(userId?: string, email?: string, roomNumber?: string): Promise<any> {
        try {
    
            // update the bookingStatus cancelled
            const booking = await Booking.findOneAndUpdate(
                { userId: userId, roomNumber: roomNumber },
                { $set: { bookingStatus: "Cancelled" } },
                { new: true }
            );
            helperService.removeProperties(booking, ["__v", "createdAt", "updatedAt"]);
            return booking;
        } catch (error) {
            console.error("Error deleting booking", error);
            throw error;
        }
    }
    /**
     * Get booking by user ID
     * @param userId - The ID of the user
     * @returns The booking with the specified user ID
     */
    public static async getBookingByUserId(userId: string): Promise<IBooking[] | null> {
        try{
            // find the all booking by userId of upcoming booking passed date will not be included
            const currentDate = new Date();
            const booking: IBooking[] | null  = await Booking.find({ userId, checkIn: { $gte: currentDate }, bookingStatus:"Booked" }).lean();
           
            return booking;
        }catch(error){
            console.error("Error fetching booking by user ID", error);
            throw error;
        }
    }
    /**
     * Cancel booking by ID
     * @param bookingId - The ID of the booking
     * @returns The canceled booking
     */
    static async cancelBookingById(bookingId: string): Promise<IBooking | null> {
        try{
            const booking = await Booking.findByIdAndDelete(bookingId);
            return booking;
        }catch(error){
            console.error("Error canceling booking", error);
            throw error;
        }
    }

    /**
     * Update room status
     * @param roomId - The ID of the room
     * @param roomInfo - The updated room information
     * @returns The updated room
     */
    static async updateRoomStatus(roomInfo: any ): Promise<any> {
        try {
            const { _id, roomNumber, roomStatus } = roomInfo;
            const updateRoomStatus = await hotelModel.findOneAndUpdate(
                { _id: _id, roomNumber: roomNumber },
                { $set: { roomStatus: roomStatus } },
                { new: true }
            );

            helperService.removeProperties(updateRoomStatus, ["__v", "createdAt", "updatedAt"]);
            return updateRoomStatus;
        } catch (error) {
            console.error("Error updating room status", error);
            throw error;
        }
    }
    /**
     * update booking checkIn and checkOut
     * @param bookingId - The ID of the booking
     * @param bookingInfo - The updated booking information
     */
  public  static async updateBookingCheckInAndCheckOut(bookingInfo: IBooking): Promise<IBooking | null> {
        try {
            const { userId, roomNumber, checkIn, checkOut, stayDuration } = bookingInfo;
            // Update the booking with the new check-in and check-out dates, and stay duration
            const booking = await Booking.findOneAndUpdate(
                { userId, roomNumber: roomNumber },
                { checkIn: checkIn, checkOut: checkOut, stayDuration: stayDuration },
                { new: true }
            );
                   
            return booking;
        } catch (error) {
            console.error("Error updating booking", error);
            throw error;
        }
    }

     

}

export default BookingDB;