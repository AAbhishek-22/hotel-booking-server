/**
 * @description Common utility functions
 * @module commonUtils
 * 
 */

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

interface commonUtils {
    hashPassword: (password: string) => string;
    convertToDate: (dateString: string) => Date;
    isValidDate: (dateString: string) => boolean;
}
/**
 * @description Function to hash a password
 * @param {string} password - The password to hash
 * @returns {string} - The hashed password
 */


const commonUtils: commonUtils = {
    
/**
 * 
 * Function to hash a password
   * @param {string} password - The password to hash.
   * @returns {string} - The hashed password.
 */
    hashPassword: (password: string): string => {
        const saltRounds = parseInt(process.env.SALT_ROUNDS || '10'); // Default to 10 if undefined
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(password, salt);
    },

/**
 * Function to convert a date string to a Date object
 * @param {string} dateString - The date string to convert.
 * @returns {Date} - The converted Date object.
 */
    convertToDate: (dateString: string): Date => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date format");
        }
        return date;
    },

    /**
     * validateDate
     * @param {string} dateString - The date string to validate.
     * @returns {boolean} - True if the date is valid, false otherwise.
     */

    isValidDate: (dateString: string): boolean => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }



}

export default commonUtils;

