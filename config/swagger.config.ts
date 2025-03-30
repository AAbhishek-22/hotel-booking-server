/**
 * Swagger Configuration
 * @swagger
 * 

 */

import dotenv from "dotenv";
import path from "path";
import { OpenAPIV3 } from "openapi-types";
import hotelModel from "../models/hotelModel";

dotenv.config({
    path: path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`),
});
// Purpose: Configuration file for Swagger.
interface SwaggerConfig extends OpenAPIV3.Document {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
        termsOfService: string;
        updated: string;
        contact: {
            name: string;
            email: string;
            url: string;
        };
        
    };
   
    servers: {
        url: string;
    }[];
    
}
interface ExtendedInfoObject extends OpenAPIV3.InfoObject {
    updated: string;

}

const swaggerConfig: SwaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Hotel Booking  API",
        version: "1.0.0",
        description: "API for Hotel Booking",
        termsOfService: "http://swagger.io/terms/",
        updated: "2021-09-01",
        contact: {
            name: "Support Team",
            email: "support@hotelbooking.com",
            url: "http://hotelbooking.com/contact",
        },

    },
    servers: [
        {
            url: `http://${process.env.HOST}:${process.env.PORT}`
        },
        {
            url: "http://localhost:3000",
        },
    ],
   
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            User: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    mobile: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                    isVerified: {
                        type: "boolean",
                    },
                    verificationToken: {
                        type: "string",
                    },
                    verificationTokenExpiry: {
                        type: "string",
                    },
                    resetToken: {
                        type: "string",
                    },
                    resetTokenExpiry: {
                        type: "string",
                    },
                    createdBy: {
                        type: "string",
                    },
                    updatedBy: {
                        type: "string",
                    },
                    deletedBy: {
                        type: "string",
                    },
                    lastLogin: {
                        type: "string",
                    },
                    loginAttempts: {
                        type: "number",
                    },
                    


                },
                required: ["name", "email", "mobile", "password"],
            },
            hotelModel:{
                type: "object",
                properties: {
                    hotelName: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                    address: {
                        type: "string",
                    },
                    city: {
                        type: "string",
                    },
                    state: {
                        type: "string",
                    },
                    country: {
                        type: "string",
                    },
                    zipCode: {
                        type: "string",
                    },
                    phoneNumber: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                },
                required: ["name", "description", "address", "city", "state", "country", "zipCode", "phoneNumber", "email"],
            }
        },
    },
   
    security: [
        {
            bearerAuth: [],
        },
    ],
   
    paths: {
        "/api/v1/user/auth/add-user": {
            post: {
                tags: ["User API"],
                summary: "User Registration",
                description: "User Registration",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "User registered successfully",
                    },
                    400: {
                        description: "User already exists",
                    },
                    500: {
                        description: "Internal server error",
                    },
                },
            },
        },
        "/api/v1/user/auth/user-login": {
            post: {
                tags: ["User API"],
                summary: "User Login",
                description: "User Login",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "User logged in successfully",
                    },
                    400: {
                        description: "User not found",
                    },
                    500: {
                        description: "Internal server error",
                    },
                },
            },
        },
        "/api/v1/bookings/add-booking": {
            post: {
                tags: ["Booking API"],
                summary: "Create Booking",
                description: "Create a new booking",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    userId: {
                                        type: "string",
                                    },
                                    checkIn: {
                                        type: "string",
                                        format: "date-time",
                                    },
                                    checkOut: {
                                        type: "string",
                                        format: "date-time",
                                    },
                                    totalAmount: {
                                        type: "number",
                                    },
                                },
                                    required: ["userId", "checkIn", "checkOut", "totalAmount"],
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Booking created successfully",
                        },
                        400: {
                            description: "Booking creation failed",
                        },
                        500: {
                            description: "Internal server error",
                        },
                    },
                },
        },
        "/api/v1/bookings/get-booking-by-email/{email}": {
            get: {
                tags: ["Booking API"],
                summary: "Get Booking by Email",
                description: "Get booking details by email",
                parameters: [
                    {
                        name: "email",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "email"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Booking details retrieved successfully"
                    },
                    400: {
                        description:' Booking not found'
                    },
                    500: {
                        description:" Internal server error"
                    }
                }
            }
        },
        "/api/v1/bookings//get-current-guest-list": {
            get: {
                tags: ["Booking API"],
                summary: "Get Current Guest List",
                description: "Get the list of current guests",
                responses: {
                    200: {
                        description: "Current guest list retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/User",  
                                    },
                                },
                                
                            },
                        },
                    },
                    400: {
                        description: "No current guests found",
                    },
                    500: {
                        description: "Internal server error",
                    },
                },
            },  
        },
        //cancel booking api
        "/api/v1/bookings/cancel-booking": {
            delete: {
                tags: ["Booking API"],
                summary: "Cancel Booking",
                description: "Cancel a booking",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string",
                                    },
                                    roomNumber: {
                                        type: "string",
                                    },
                                },
                                required: ["bookingId"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Booking cancelled successfully",
                    },
                    400: {
                        description: "Booking cancellation failed",
                    },
                    500: {
                        description: "Internal server error",
                    },
                },
            },
        },
        //update booking check in and check out
        "/api/v1/bookings/update-booking-check-in-and-check-out": {
            put: {
                tags: ["Booking API"],
                summary: "Update Booking Check-In and Check-Out",
                description: "Update the check-in and check-out dates of a booking",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    bookingId: {
                                        type: "string",
                                    },
                                    checkIn: {
                                        type: "string",
                                        format: "date-time",
                                    },
                                    checkOut: {
                                        type: "string",
                                        format: "date-time",
                                    },
                                },
                                required: ["bookingId", "checkIn", "checkOut"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Booking updated successfully",
                    },
                    400: {
                        description: "Booking update failed",
                    },
                    500: {
                        description: "Internal server error",
                    },
                },
            },
        },


                                
        
        
    },


};

export default swaggerConfig;









