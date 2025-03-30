/**
 * @description Interface for the room object
 * @interface
 */

import { Document } from "mongoose";

export interface IHotel  {
    _id?: string;
    room_uid?: string;
    hotelName: string;
    roomNumber: string;
    location?: string;
    roomType?: "Single" | "Double" | "Suite";
    roomPrice?: number;
    roomStatus?: "Available" | "Booked" | "Under Maintenance";
    roomThumbnailImage?: string;
    roomImages?: string[];
    roomDescription?: string;
    roomCapacity?: number;
}