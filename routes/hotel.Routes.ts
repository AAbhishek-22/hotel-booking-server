/**
 * @description This file contains the routes for the room module.
 * @module roomRoutes
 */
import express, { Router } from "express";

const roomRouter:Router =express.Router();

//  const roomController = require("../controllers/roomController");
// const { createRoom, getAllRooms } = roomController;
//  const { authenticateUser } = require("../middleware/jwt.auth.middleware");
// const { authorizeUser } = require("../middlewares/authorizationMiddleware");
import  roomController  from "../controllers/hotelController";
const { createRoom, getAllRooms, getRoomById } = roomController;

//ROOM ROUTES
roomRouter.post("/add-room", createRoom);
roomRouter.get("/get-room-list", getAllRooms);
roomRouter.get("/get-room/:id", getRoomById);
// roomRouter.put("/:id", authenticateUser, authorizeUser, getAllRooms);
// roomRouter.delete("/:id", authenticateUser, authorizeUser, getAllRooms);
// roomRouter.patch("/:id", authenticateUser, authorizeUser, getAllRooms);

export default roomRouter;