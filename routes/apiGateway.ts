
/**
 * @file apiGateway.ts
 * @description This file serves as the API gateway for the application.
 * It defines the routes for user authentication and other related functionalities.
 * @module apiGateway
 * @requires express
 * @requires Router
 */
import express, { Router } from "express";
import { Application } from "express";

const apiRouter:Router = express.Router();

import userRoutes from "./user.Routes";
import roomRoutes from "./hotel.Routes"
import bookingRoutes from "./booking.Routes";


apiRouter.use("/user/auth",userRoutes)
apiRouter.use("/room",roomRoutes)
apiRouter.use("/bookings",bookingRoutes)


export default apiRouter