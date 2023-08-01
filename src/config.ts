import { config } from "dotenv";
config();

export const ACCESS_KEY = process.env.ACCESS_TOKEN_KEY as string;

export const REFRESH_KEY = process.env.REFRESH_TOKEN_KEY as string;