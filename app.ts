/**
 * @fileoverview Server configuration file for the manageESG-server application.
 * 
 * This module sets up and configures the Express server, including middleware
 * such as body-parser for handling JSON and URL-encoded request bodies.
 * 
 * @module app
 * @requires express
 * @requires body-parser
 * ---
 * @remarks
 * This file is the entry point for the server application. It initializes
 * the server and applies necessary middleware for request processing.
 * 
 * @example
 * // To start the server, run:
 * // $ node app.ts
 * 
 * @see {@link https://expressjs.com/|Express Documentation}
 * @see {@link https://github.com/expressjs/body-parser|body-parser Documentation}
 */


import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response, NextFunction, Express } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import apiRoutes from "./routes/apiGateway";
import apiResponse from "./responses/apiResponse";
import { startServer } from "./config/server.config";
//import cluster from "cluster";
//import os from "os";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { dbConfig } from "./config/db.config";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger.config";
//import healthRoutes from "./routes/HealthRoutes";

// Initialize Express App
const app:Application  = express();
//const numCPUs = os.cpus().length;

// Middleware to serve Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

// Database Configuration
dbConfig();

//------------------
// Configure App
//------------------
const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());// Parse incoming requests data
app.use(compression());// Compress all routes
app.use(helmet());// Set security HTTP headers

//------------------
// Configure Error Handling
//------------------
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   apiResponse.internalServerErrorResponse(
//     res,
//     "An error occurred while processing your request"
//   );
// });

//------------------
// Health Check 
//------------------
//app.use("/", healthRoutes);


//------------------
// Configure Routes
//------------------
app.use("/api/v1", apiRoutes);

app.all("*", (req: any, res: any) => {
  apiResponse.notFoundResponse(
        res,
        `The URL ${req.originalUrl} is not on this server`
    );
});

// Start server
startServer(app);
