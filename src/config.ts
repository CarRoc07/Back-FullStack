import { config } from "dotenv";
config();

export const ACCESS_KEY = process.env.ACCESS_TOKEN_KEY as string;

export const REFRESH_KEY = process.env.REFRESH_TOKEN_KEY as string;

export const SUPER_USER = process.env.SUPER_USER as string;

export const PORT = process.env.PORT || 3000;