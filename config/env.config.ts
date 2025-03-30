// Purpose: Configuration file for environment variables.
interface EnvConfig {
    port: number;
    mongodbUrl: string;
  }

import dotenv from 'dotenv';
import path from 'path';

// Load environment-specific configuration
const envFile = path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: envFile });



const config: EnvConfig = {
  port: parseInt(process.env.PORT || '3000'),
  mongodbUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/defaultDB',
};

export default config;

