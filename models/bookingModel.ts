/**
 * @description This file contains the Booking model for the application.
 * It defines the schema for the Booking object and provides methods to interact with the database.
 * @module bookingModel
 */
import mongoose, { Document, Schema } from "mongoose";
import { IBooking } from "../interfaces/bookingInterface";
import { IHotel } from "../interfaces/hotelInterfaces";


const bookingSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    roomNumber: {
        type: String,
        required: false,
    },
    nameOfGuests: [{
        type: String,
        required: false,
    }],

    stayDuration: {
        type: String,
        required: false,
    },
    bookingStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Confirmed",
        required: false,
    },

}, { timestamps: true });
const bookingModel = mongoose.model<IBooking>("Booking", bookingSchema);
export default bookingModel;