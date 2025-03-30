/**
 * User service
 * Service file will contail all the business logic for user-related operations.
 */

import {Request ,Response } from "express";
import { IUser } from "../interfaces/UserInterFace";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDB } from "../database/user.db";
import apiResponse from "../responses/apiResponse";
import CommonUtils from "../utils/common.utils";
import { v4 as uuidv4 } from "uuid";


export class UserService {
    /**
     * User Registration
     * Service will handle the data validation and passes the data to the model to 
     * implement the database operations.
     * @param name - The name of the user.
     * @param email - The email of the user.
     * @param password - The password of the user.
     */
    public static async registerUser(userInfo: IUser, res: Response): Promise<any> {
        const { uid, name, email, mobile, password } = userInfo;
        try {

            const hashedPassword = CommonUtils.hashPassword(password);
            const uuid = uuidv4();
            const user: IUser = new User({
                uid: uuid,
                name,
                email,
                mobile,
                password: hashedPassword,
            });
            const newUser = await UserDB.registerUser(user);
            if (!newUser || newUser == null || newUser == undefined) {
                throw new Error("User registration failed");
            }
            return newUser;
        } catch (error: any) {
            console.error("Error creating user", error)
            if (error.message === "User already exists") {
                throw new Error(error.message);
            }
            throw new Error(`Error: ${error.message}`);
        }
    }

    /**
     * User Login
     * Service will handle the data validation and passes the data to the model to
     * implement the database operations.
     * @param email - The email of the user.
     * @param password - The password of the user.
     */

    public static async loginUser(email: string, password: string): Promise<any> {
        try {
            let userExists: any ;
             userExists = await UserDB.fetchUserByEmailMobileId(email);
            if (!userExists) {
                throw new Error("User not found");
            }
            const isPasswordMatch = await bcrypt.compare(password, userExists.password);
            if (!isPasswordMatch) {
                throw new Error("Invalid password");
            }

            const payload = {
                _id: userExists._id.toString(),
                uid: userExists.uid,
                name: userExists.name,
                email: userExists.email,
                mobile: userExists.mobile,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: parseInt(process.env.JWT_EXPIRE_TIME as string) });
    
            return token;
        } catch (error: any) {
            console.error("Error logging in user", error)
            if (error.message === "User not found") {
                throw new Error(error.message);
            }
            throw new Error(`Error: ${error.message}`);
        }
    }

}