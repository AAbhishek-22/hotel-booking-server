
/**
 * This interface defines the structure of a booking object.
 * It extends the Document interface from mongoose to include additional properties.
 * 
 */

import { Document } from "mongoose";
import { IHotel } from "./hotelInterfaces";

export interface IBooking extends Document {
    userId: string;
    roomId?: string;
    nameOfGuests?: string[];
    checkIn: Date;
    checkOut: Date;
    stayDuration?: string; 
    roomNumber?: string ;
    totalAmount: number;
    bookingStatus?: "Pending" | "Confirmed" | "Cancelled";
    roomDetails?: IHotel; 
}
export interface IBookingInputDTO {
    userId: string;
    roomId: string;
    checkInDate: Date;  
    checkOutDate: Date;
    totalAmount: number;
}
export interface IBookingResponse {
    userId: string; 
    roomId: string;
    checkInDate: Date;
    checkOutDate: Date;
    totalAmount: number;
    roomDetails?: IHotel; // Optional property to include room details
}
export interface IBookingUpdateDTO {
    checkInDate?: Date;
    checkOutDate?: Date;
    totalAmount?: number;
}
export interface IBookingDeleteDTO {
    bookingId: string;
}
export interface IBookingQuery {
    userId?: string;
    roomId?: string;
    checkInDate?: Date;
    checkOutDate?: Date;
    totalAmount?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filterBy?: string;
    filterValue?: string;
    search?: string;
    searchFields?: string[];
    select?: string;
    populate?: string;
    lean?: boolean;
    skip?: number;
}

export interface IBookingInfo{
    roomNumber?: string;
    checkIn?: Date;
    checkOut?: Date;
    email?: string;
    userId?: string;
}