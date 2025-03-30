/**
 * @file userRoutes.ts
 * @description This file defines the routes for user authentication and related functionalities.
 * @module userRoutes
 */

import express, { Router } from "express";

const router: Router = express.Router();

import  UserController from "../controllers/userController";

import  userValidator  from "../validators/userValidatore";
//import { authMiddleware } from "../middleware/authMiddleware";

// import { userValidation } from "../validation/userValidation";
// import { authMiddleware } from "../middleware/authMiddleware";
// import { userRoleMiddleware } from "../middleware/userRoleMiddleware";
// import { userPermissionMiddleware } from "../middleware/userPermissionMiddleware";


//USER ROUTES
router.post("/add-user", userValidator.validateAddUser as unknown as express.RequestHandler , UserController.registerUser);
router.post("/user-login", UserController.loginUser);

 export default router;