
import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction,  } from "express";
import apiResponse from "../responses/apiResponse";


/**
 * User validation middleware
 * @module userValidation
 */

export class UserValidator{

    static validateAddUser = [
        body("name").trim().notEmpty().withMessage("Name is required"),
        body("email").trim().notEmpty().isEmail().withMessage("Valid email is required"),
        body("password").trim().notEmpty().withMessage("Password is required"),
    
        // Sanitization (Removing Extra Spaces & Preventing Injection)
        body("name").escape(),
        body("email").normalizeEmail(),
        body("password").escape(),

        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.badRequestResponse(res, errors.array()[0].msg);
            }
            next();
        },
    ];
}

export default UserValidator;