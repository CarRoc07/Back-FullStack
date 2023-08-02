"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.REFRESH_KEY = exports.ACCESS_KEY = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ACCESS_KEY = process.env.ACCESS_TOKEN_KEY || "ijdbhwckijb";
exports.REFRESH_KEY = process.env.REFRESH_TOKEN_KEY || "dfiwugfiuw";
exports.PORT = process.env.PORT || 3000;
