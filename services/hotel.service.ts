/**
 * RoomService class
 * @class RoomService
 * Handles room-related operations
 * @module roomService
 * @requires IHotel
 */
import { IHotel } from "../interfaces/hotelInterfaces";
import Room from "../models/hotelModel";
import apiResponse from "../responses/apiResponse";
import RoomDB  from "../database/hotel.db";
import CommonUtils from "../utils/common.utils";
import { v4 as uuidv4 } from "uuid";
import { UserDB } from "../database/user.db";


class RoomService {
    /**
     * Create a new room
     * @param roomInfo - The room information
     * @returns The created room
     */
    public static async createRoom(roomInfo: IHotel): Promise<IHotel | null> {
        try {
            const { hotelName, roomNumber, roomDescription, roomType } = roomInfo;
            const uuid = uuidv4();
            const room: IHotel = new Room({
                room_uid: uuid,
                hotelName,
                roomNumber,
                roomDescription,
                roomType,
            });
            const newRoom = await RoomDB.createRoom(room);
            if (!newRoom || newRoom == null || newRoom == undefined) {
                throw new Error("Room creation failed");
            }
            return newRoom;
        } catch (error: any) {
            console.error("Error creating room", error);
            if (error.message === "Room already exists") {
                throw new Error(error.message);
            }
            throw new Error(`Error: ${error.message}`);
        }
    }
    /**
     * Get all rooms
     * @returns All rooms
     * 
     * */
    public static async getAllRooms(): Promise<IHotel[] | null> {
        try {
            const rooms = await RoomDB.getAllRooms();
            if (!rooms || rooms == null || rooms == undefined) {
                throw new Error("No rooms found");
            }
            return rooms;
        } catch (error: any) {
            console.error("Error fetching rooms", error);
            throw new Error(`Error: ${error.message}`);
        }
    }
    /**
     * Get room by ID
     * @param roomId - The ID of the room
     * @returns The room with the specified ID
     * */
    public static async getRoomById(roomId: string): Promise<IHotel | null> {
        try {
            const room = await RoomDB.getRoomById(roomId);
            if (!room || room == null || room == undefined) {
                throw new Error("Room not found");
            }
            return room;
        } catch (error: any) {
            console.error("Error fetching room", error);
            throw new Error(`Error: ${error.message}`);
        }
    }
    /**
     * Update room by ID
     * @param roomId - The ID of the room
     * @param roomInfo - The updated room information
     * @returns The updated room
     * */
    // public static async updateRoomById(roomId: string, roomInfo: IHotel): Promise<IHotel | null> {
    //     try {
    //         const updatedRoom = await RoomDB.updateRoomById(roomId, roomInfo);
    //         if (!updatedRoom || updatedRoom == null || updatedRoom == undefined) {
    //             throw new Error("Room update failed");
    //         }
    //         return updatedRoom;
    //     } catch (error: any) {
    //         console.error("Error updating room", error);
    //         throw new Error(`Error: ${error.message}`);
    //     }
    // }
    /**
     * Delete room by ID
     * @param roomId - The ID of the room
     * @returns The deleted room
     * */
    // public static async deleteRoomById(roomId: string): Promise<IHotel | null> {
    //     try {
    //         const deletedRoom = await RoomDB.deleteRoomById(roomId);
    //         if (!deletedRoom || deletedRoom == null || deletedRoom == undefined) {
    //             throw new Error("Room deletion failed");
    //         }
    //         return deletedRoom;
    //     } catch (error: any) {
    //         console.error("Error deleting room", error);
    //         throw new Error(`Error: ${error.message}`);
    //     }
    // }
}

export default RoomService;
