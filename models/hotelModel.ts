/**
 * Room Model for the Room schema.
 * hotel name, room number, room type, room price, room status, room image, room description and room capacity.
 */

import { Document, Schema, model } from "mongoose";
import { IHotel } from "../interfaces/hotelInterfaces";



const roomSchema = new Schema<IHotel>({
    room_uid: {
        type: String,
        required: false,
    },
    hotelName: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
    },
    roomType: {
        type: String,
        enum: ["Single", "Double", "Suite"],
        default: "Single",
        required: false,
    },
    location: { type: String, required: false },
    roomPrice: {
        type: Number,
        required: false,
    },
    roomStatus: {
        type: String,
        enum: ["Available", "Booked", "Under Maintenance"],
        default: "Available",
        required: false,
    },
    roomThumbnailImage: {
        type: String,
        default: "",
        required: false,
    },
    roomImages:[ {
        type: String,
        required: false,
    }],
    roomDescription: {
        type: String,
        required: false,
    },
    roomCapacity: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: false,
    },
},{
    timestamps: true,
});

export default model<IHotel>("Room", roomSchema);
