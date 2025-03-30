import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

//load environment variables from .env file in env folder
 //dotenv.config({ path: path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`) });

 const envPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "../.env") // After build, `.env` is in `dist`
    : path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`);

dotenv.config({ path: envPath });


 //check environment 

export const dbConfig = () => {
  const dbUrl: string | undefined = process.env.MONGODB_URL;

  if (!dbUrl) {
    console.error("MONGODB_URL is not defined in the environment variables.");
    process.exit(1);
  }

  mongoose.connect(dbUrl);
  //console.log("url mongodb",dbUrl)

  mongoose.connection.on("connected", () => {
    console.log(`
---------------------------------------------------------
✅ Database connected
---------------------------------------------------------
    `);
  });

  mongoose.connection.on("error", (err: Error) => {
    console.error(`Database connection error: ${err.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log(`
---------------------------------------------------------
Database disconnected
---------------------------------------------------------
    `);
  });

  // Graceful shutdown
  process.on("SIGINT", async () => {
    try {
      await mongoose.connection.close();
      console.log("Database connection closed due to application termination.");
      process.exit(0);
    } catch (err) {
      console.error("Error while closing database connection:", err);
      process.exit(1);
    }
  });
};

export default dbConfig;
