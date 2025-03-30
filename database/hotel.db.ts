/**
 * Room database for storing user data.
 * This file contains the database operations for the room model.
 * @module roomDB
 */

import { IHotel } from "../interfaces/hotelInterfaces";
import roomModel from "../models/hotelModel";


class RoomDB {
    /**
     * Create a new room
     * @param room - The room object to be created
     * @returns The created room object
     */
    public static async createRoom(room: IHotel): Promise<IHotel | null> {
        try {
            const newRoom = await roomModel.create(room);
            return newRoom;
        } catch (error) {
            console.error("Error creating room", error);
            throw new Error("Room creation failed");
        }
    }

    /**
     * Get all rooms
     * @returns An array of all room objects
     * */
    public static async getAllRooms(): Promise<IHotel[] | null> {
        try {
            const rooms = await roomModel.find();
            return rooms;
        } catch (error) {
            console.error("Error fetching rooms", error);
            throw new Error("No rooms found");
        }
    }

    /**
     * Fetch a room by its ID
     * @param id - The ID of the room to be fetched
     * @returns The room object if found, null otherwise
     * */
    public static async getRoomById(id: string): Promise<IHotel | null> {
        try {
            const room = await roomModel.findById(id);
            return room;
        } catch (error) {
            console.error("Error fetching room", error);
            throw new Error("Room not found");
        }
    }
    /**
     * Update a room by its ID
     * @param id - The ID of the room to be updated
     * @param room - The updated room object
     * @returns The updated room object
     * */
    

    /**
     * GET Available rooms list
     * @returns An array of available room objects
     * 
     */
    public static async getAvailableRoomList(): Promise<IHotel[] | null> {
        try {
            const availableRooms = await roomModel.find({ roomStatus: "Available" });
            return availableRooms;
        } catch (error) {
            console.error("Error fetching available rooms", error);
            throw new Error("No available rooms found");
        }
    }


}
export default RoomDB;