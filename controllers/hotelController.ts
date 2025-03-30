/**
 * Room Controller
 * Handles the room related operations
 * @module roomController
 */

import { Request, Response } from "express";
import { IHotel } from "../interfaces/hotelInterfaces";
import Room from "../models/hotelModel";
import apiResponse from "../responses/apiResponse";
import  RoomDB  from "../database/hotel.db";
import  RoomService  from "../services/hotel.service";
import { AuthenticatedRequest } from "../interfaces/UserInterFace";
import mongoose from "mongoose";
             

import CommonUtils from "../utils/common.utils";
import { UserDB } from "../database/user.db";
import { UserService } from "../services/user.service";



export class RoomController {
    /**
     * Create a new room
     * @param req - The request object
     * @param res - The response object
     */
    public static async createRoom(req: AuthenticatedRequest, res: Response): Promise<any> {
        try {
            const {roomNumber, hotelName, description, roomType } = req.body;
            
            const roomInfo: IHotel = new Room({
                hotelName,
                roomNumber,
                description,
                roomType,
            });
            const room = await RoomService.createRoom(roomInfo);
            if (!room || room == null || room == undefined) {
                return apiResponse.badRequestResponse(res, "Room creation failed");
            }
            return apiResponse.successResponseWithData(res, "Room created successfully", room);
        } catch (error: any) {
            console.error("Error creating room", error)
            apiResponse.serverErrorResponse(res, error);
        }
    }

    /**
     * Get all rooms
     * @param req - The request object
     * @param res - The response object
     */
    public static async getAllRooms(req: Request, res: Response): Promise<any> {
        try {
            const rooms = await RoomDB.getAllRooms();
            if (!rooms || rooms == null || rooms == undefined) {
                return apiResponse.badRequestResponse(res, "No rooms found");
            }
            return apiResponse.successResponseWithData(res, "Rooms fetched successfully", rooms);
        } catch (error: any) {
            console.error("Error fetching rooms", error)
            apiResponse.serverErrorResponse(res, error);
        }
    }
    /**
     * Get room by ID
     * @param req - The request object
     * @param res - The response object
     * @param id - The room ID
     * @returns {Promise<any>} - The room object
     * 
        * @throws {Error} - If the room is not found
        */
    public static async getRoomById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
               if (!mongoose.Types.ObjectId.isValid(id)) {
                    return apiResponse.badRequestResponse(res, "Invalid room ID");
                }       
           
            const room = await RoomDB.getRoomById(id);
            if (!room || room == null || room == undefined) {
                return apiResponse.badRequestResponse(res, "Room not found");
            }
            return apiResponse.successResponseWithData(res, "Room fetched successfully", room);
        } catch (error: any) {
            console.error("Error fetching room", error)
            apiResponse.serverErrorResponse(res, error);
        }
    }
    /**
     * Update room by ID
     * @param req - The request object
     * @param res - The response object
     * @param id - The room ID
     * @returns {Promise<any>} - The updated room object
     */
    // public static async updateRoomById(req: Request, res: Response): Promise<any> {
    //     try {
    //         const { id } = req.params;
    //         const { name, description, capacity } = req.body;
    //         const roomInfo: IHotel = new Room({
    //             name,
    //             description,
    //             capacity,
    //         });
    //         const room = await RoomDB.updateRoomById(id, roomInfo);
    //         if (!room || room == null || room == undefined) {
    //             return apiResponse.badRequestResponse(res, "Room update failed");
    //         }
    //         return apiResponse.successResponseWithData(res, "Room updated successfully", room);
    //     } catch (error: any) {
    //         console.error("Error updating room", error)
    //         apiResponse.serverErrorResponse(res, error);
    //     }
    // }

}

export default RoomController