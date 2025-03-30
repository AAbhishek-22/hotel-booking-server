/**
 * User Interface
 * This file defines the User interface, which represents a user in the system.
 */

import { Document } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';


export interface IUser extends Document {
    uid: string;
    name: string;
    email: string;
    mobile: string;
    password: string;
    isDeleted: boolean;
    isVerified: boolean;
    verificationToken: string;
    verificationTokenExpiry: Date;
    resetToken: string;
    resetTokenExpiry: Date;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    lastLogin: Date;
    loginAttempts: number;
    isLocked: boolean;
    lockUntil: Date;
    role: string;
    permissions?: string[];
    profilePicture?: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    };
}

export interface IUserInputDTO {
    name: string;
    email: string;
    mobile: string;
    password: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    };
}



export interface IUserResponse {
    uid: string;
    name: string;
    email: string;
}


export interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload
    userId?: string;
}



