import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from the correct `.env` file
const envPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "../.env") // After build, `.env` is in `dist`
    : path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`);

dotenv.config({ path: envPath });

console.log(`Loaded environment from: ${envPath}`);

// Define server configuration with type safety
interface ServerConfig {
  port: number;
  host: string;
  baseUrl: string;
}

const serverConfig: ServerConfig = {
  port: parseInt(process.env.PORT || "10000", 10),
  host: process.env.HOST || "0.0.0.0",
  baseUrl: process.env.BASE_URL || `http://${process.env.HOST}:${process.env.PORT}`, // Ensure correct reset link
};

// Server listening function
export const startServer = (app: Application): void => {
  const { port, host, baseUrl } = serverConfig;

  app.listen(port, host, () => {
    console.log(`
---------------------------------------------------------
 ✅ Server started successfully!
---------------------------------------------------------
 🌍 Running at:        ${baseUrl}
 🚀 Mode:              ${process.env.NODE_ENV || "development"}
 🕒 Started at:        ${new Date().toLocaleString()}
 📄 API Docs:          ${baseUrl}/api-docs
---------------------------------------------------------
`);
  });
};

export default startServer;
