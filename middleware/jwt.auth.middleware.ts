/**
 * @apiDefine jwtAuthMiddleware jwtAuthMiddleware 
 * @apiDescription This middleware is used to authenticate the user using JWT token.
 * @apiHeader {String} Authorization JWT token of the user.
 * 
 */

import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces/UserInterFace';

import jwt from 'jsonwebtoken';
import apiResponse from '../responses/apiResponse';

import dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`) });
/**
 * Extend the Request interface to include the user property.
 */
// declare module 'express-serve-static-core' {
//   interface Request {
//     user?:string | JwtPayload;
//   }
// }

/**
 * Middleware to authenticate the user using JWT token.
 * Middleware to authenticate the user using JWT token.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @returns {Promise<Response>} The response object.
 */



dotenv.config();

const secret = process.env.JWT_SECRET_KEY as string;


export const authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<any> => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return apiResponse.unauthorizedResponse(res, "Not Authorized...!");
    }

    const token = authHeader.split(" ")[1]; // Extract the token
    if (!token) {
      return apiResponse.unauthorizedResponse(res, "Not Authorized...!");
    }

    // Decode token to check for expiry
    const decodedToken = jwt.decode(token) as JwtPayload | null;
    if (!decodedToken) {
      return res.status(401).json({ status: false, message: "Sign Up First" });
    }

    if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({ status: false, message: "Login First!" });
    }

    // Verify the token
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json({ status: false, message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } catch (err: any) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

export default authentication;




