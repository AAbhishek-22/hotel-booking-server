import { ECDH } from "crypto";

/**
 * User database
 * The module contaisns the layer for user database operations.
 * 
 */
import { IUser } from "../interfaces/UserInterFace";
import userModel from "../models/UserModel";
import  helperService  from "../helpers/helper.service";


export class UserDB {
   
    //fetch user by email or id or by phone number
   public static async fetchUserByEmailMobileId(email?: string, uid?: string, mobile?: string) {
      try {
         const user = await userModel.findOne({ $or: [{ email }, { uid : uid }, { mobile }] });
         return user;
      } catch (error: unknown) {
         console.error(error);
         return null;
      }
   
}

//register user
public static async registerUser(user: IUser) {
      try {
         const newUser = await userModel.create(user);
         if (!newUser) {
            throw new Error("User registration failed");
         }

       //response
       const userResponse : Partial<IUser> = newUser.toObject();
       
       helperService.removeProperties(userResponse,[
             "password",
             "isDeleted",
             "isVerified",
             "verificationToken",
             "verificationTokenExpiry",
             "resetToken",
             "resetTokenExpiry",
             "createdBy",
             "updatedBy",
             "deletedBy",
             "lastLogin",
             "loginAttempts",
             "isLocked",
             "lockUntil",
             "__v",
       ]);

         return userResponse;
      } catch (error:unknown) {
         console.error("Error creating user:", error);
         if (error instanceof Error) {
             throw new Error(`User creation failed: ${error.message}`);
         } else {
             throw new Error('User creation failed: Unknown error');
         }
      }
   }
   

}