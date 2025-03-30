/**
 * User Controller
 * This file contains the controller functions for user-related operations.
 */
import express,{ Request, Response } from "express";
import { IUser } from "../interfaces/UserInterFace";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserDB } from "../database/user.db";
import { UserService } from "../services/user.service";
import apiResponse from "../responses/apiResponse";





export class UserController {
    /**
 * User Registration
 * Controller will hand the data validation and passes the data to the service to 
 * implement the .
 * @param req - The request object containing user details.
 * @param res - The response object.
 */

    public static async registerUser(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { name, email, password, confirmPassword, mobile } = req.body;

            if (password !== confirmPassword) {
                return apiResponse.badRequestResponse(res, "Password and confirm password is must be same");
            }

            const userExist = await UserDB.fetchUserByEmailMobileId(email);
            if (userExist) {
                return apiResponse.conflictResponse(res, "User already exists");
            }
           
            const userInfo: IUser = new User({
                name,
                mobile,
                email,
                password
            });
            const user = await UserService.registerUser(userInfo, res);
            if (!user || user == null || user == undefined) {
                return apiResponse.badRequestResponse(res, "User registration failed");
            }

            return apiResponse.successResponseWithData(res, "User registered successfully", user);
        } catch (error: any) {
            console.error("Error creating user", error)
            apiResponse.serverErrorResponse(res, error);
        }
    }

    /**
     * User Login
     * Controller will hand the data validation and passes the data to the service to
     */

    public static async loginUser(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { email, password } = req.body;
            const user = await UserDB.fetchUserByEmailMobileId(email);
            if (!user) {
                return apiResponse.notFoundResponse(res, "You are not registered with us");
            }

           const loggedIn =await UserService.loginUser(email, password);
            return apiResponse.successResponseWithToken(res, "User logged in successfully", loggedIn);
        } catch (error: any) {
            console.error("Error creating user", error)
            apiResponse.serverErrorResponse(res, error);
        }
    }

    

}

export default UserController;







