/**
 * @description Booking service
 * @module bookingService
 */
import BookingDB from "../database/booking.DB";
import Booking from "../models/bookingModel";
import { IBooking, IBookingInfo } from "../interfaces/bookingInterface";
import { IHotel } from "../interfaces/hotelInterfaces";
import hotelModel from "../models/hotelModel";
import helperService from "../helpers/helper.service";


class BookingService {
    /**
     * Create a new booking
     * @param bookingInfo - The booking information
     * @returns The created booking
     */
    public static async createBooking(bookingInfo: IBooking): Promise<IBooking | null> {
        try {
            const {
                userId,
                roomId,
                roomNumber,
                checkIn,
                checkOut,
                totalAmount,
                nameOfGuests
            }= bookingInfo;
            //calculate stay duration based on checkIn and checkOut dates in days
            const checkInDate = new Date(bookingInfo.checkIn);
            const checkOutDate = new Date(bookingInfo.checkOut);
            const stayDuration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
            bookingInfo.stayDuration = `${stayDuration} Days`;
            bookingInfo.roomNumber = roomNumber;
            
            const booking = await BookingDB.createBooking(bookingInfo);
            if (!booking) {
                throw new Error("Booking creation failed");
            }
            // Update the room status to "Booked"
           
            await hotelModel.updateOne({$and:[{_id:roomId},{roomNumber:roomNumber}]},{roomStatus: "Booked"},{new:true});
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
            const bookings = await BookingDB.getAllBookings();
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
        try {
            const booking = await BookingDB.getBookingById(bookingId);
            return booking;
        } catch (error) {
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
    public static async updateBookingById(bookingId:string,bookingInfo: IBooking): Promise<IBooking | null> {
        try {
            // if (!bookingInfo) {
            //     throw new Error("Booking information is required");
            // }
            const updatedBooking = await BookingDB.updateBookingById(bookingId,bookingInfo);
            return updatedBooking;
        } catch (error) {
            console.error("Error updating booking", error);
            throw error;
        }
    }
    /**
     * Delete booking by ID
     * @param bookingId - The ID of the booking
     * @returns The deleted booking
     */
    public static async deleteBookingByEmailRoomNumberId(bookingInfo:IBookingInfo): Promise< IBooking | null> {
        try {
            const {userId, email, roomNumber, checkIn, checkOut } = bookingInfo;
            //console.log("Booking Info", bookingInfo);
            const deletedBooking = await BookingDB.deleteBookingByEmailRoomNumberId(userId, email, roomNumber);
            return deletedBooking;
        } catch (error) {
            console.error("Error deleting booking", error);
            throw error;
        }
    }
    /**
     * Get all bookings by user ID
     * @param userId - The ID of the user
     * @returns All bookings for the specified user
     */
    public static async getBookingsByUserId(userId: string): Promise<IBooking[] | null> {
        try {

            const bookings = await BookingDB.getBookingByUserId(userId);
            return bookings;
        } catch (error) {
            console.error("Error fetching bookings", error);
            throw error;
        }
    }
    /**
     * Cancel booking by ID
     * @param bookingId - The ID of the booking
     * @returns The canceled booking
     */
    public static async updateRoomStatus(roomInfo: string): Promise<IBooking | null> {
        try {
            
            
            // Update the room status to "Available"
            const roomAvailable = await BookingDB.updateRoomStatus(roomInfo);
            
            return roomAvailable;
        } catch (error) {
            console.error("Error canceling booking", error);
            throw error;
        }
    }

    /**
     * Update guest check-in and check-out
     * @param bookingId - The ID of the booking
     * @param bookingInfo - The updated booking information
     * @returns The updated booking
     */
    public static async updateBookingCheckInAndCheckOut(bookingInfo: any): Promise<any> {
        try {
            let { userId, checkIn, checkOut } = bookingInfo;
            let booking = await BookingDB.getBookingByUserId(userId);
            if (checkIn === undefined) {
                if (booking === null) {
                    throw new Error("Booking not found");
                }
                checkIn = booking[0].checkIn;

            } if (checkOut === undefined) {
                if (booking === null) {
                    throw new Error("Booking not found");
                }
                checkOut = booking[0].checkOut;
            }
            const parsedCheckIn = new Date(checkIn);
            const parsedCheckOut = new Date(checkOut);
              if (parsedCheckIn >= parsedCheckOut) {
                       throw new Error ( "Check-in date must be earlier than check-out date");
                    }
            
            const stayDuration = helperService.calculateStayDuration(checkIn, checkOut);
            bookingInfo.stayDuration = stayDuration;
            const updatedBooking = await BookingDB.updateBookingCheckInAndCheckOut(bookingInfo);
            return updatedBooking;
        } catch (error) {
            console.error("Error updating booking", error);
            throw error;
        }
    }
}


export default BookingService;