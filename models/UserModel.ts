/**
 * UserModel.ts
 * This file defines the UserModel class, which represents a user in the system.
 * It includes properties for the user's ID, name, email, and password.
 * The class also includes methods for creating a new user and validating user credentials.
 *  
 * @module UserModel
 * @version 1.0 
 * @date 2025-03-28
 *
 * @description This module is part of a user management system that allows for user registration and authentication.
 *
 * 
 * @typedef {Object} User
 * @property {string} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The hashed password of the user.
 *  * @class UserModel
 * @classdesc Represents a user in the system.
 * 
 * 
 */



import mongoose, { Document, Model, Schema,model } from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';

 import { IUser } from '../interfaces/UserInterFace';

/**
 * UserModel class
 * This class represents a user in the system.
 * 
 * 
/

/**
 * @class UserModel
 * @extends mongoose.Model
 * @property {string} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The hashed password of the user.
 * @property {boolean} isDeleted - Indicates if the user is deleted.
 * @property {boolean} isVerified - Indicates if the user is verified.
 * @property {string} verificationToken - The token used for email verification.
 * @property {Date} verificationTokenExpiry - The expiry date of the verification token.
 * @property {string} resetToken - The token used for password reset.
 * @property {Date} resetTokenExpiry - The expiry date of the reset token.
 * @property {string} createdBy - The ID of the user who created this user.
 * @property {string} updatedBy - The ID of the user who last updated this user.
 * @property {string} deletedBy - The ID of the user who deleted this user.
 * @property {Date} lastLogin - The last login date of the user.
 * @property {number} loginAttempts - The number of login attempts made by the user.
 * @property {boolean} isLocked - Indicates if the user's account is locked.
 * @property {Date} lockUntil - The date until which the user's account is locked.
 * @property {string} role - The role of the user (e.g., admin, user).
 * @property {Array<string>} permissions - An array of permissions assigned to the user.
 * @property {string} profilePicture - The URL of the user's profile picture.
 * @property {Object} address - The address of the user.
 */


const userSchema = new Schema<IUser>(
    {
        uid: {
            type: String,
            required: true,
            unique: false,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            default: "",
        },
        verificationTokenExpiry: {
            type: Date,
            default: null,
        },
        resetToken: {
            type: String,
            default: "",
        },
        resetTokenExpiry: {
            type: Date,
            default: null,
        },
        createdBy: {
            type: String,
            required: false,
        },
        updatedBy: {
            type: String,
            required: false,
        },
        
        lastLogin: {
            type: Date,
            default: null,
        },
        loginAttempts: {
            type: Number,
            default: 0,
        },
    
        role: {
            type: String,
            required: false,
            enum: ["admin", "user"],
            default: "user",
        },
       
        profilePicture: {
            type: String,
            default: "",
        },
        address: {
            street: {
                type: String,
                default: "",
            },
            city: {
                type: String,
                default: "",
            },
            state: {
                type: String,
                default: "",
            },
            country: {
                type: String,
                default: "",
            },
            zip: {
                type: String,
                default: "",
            },
        },
    },
    {
        timestamps: true,
       
    }
);

/**
 * Mongoose model for the User schema.
 *
 * @const User
 * @type {Model<IUser>}
 */
 const User: Model<IUser>  = model<IUser>("User", userSchema);
 

export default User;