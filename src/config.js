import { config } from 'dotenv';

config();

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;
export const API_PORT = process.env.API_PORT ? Number(process.env.API_PORT) : undefined;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;