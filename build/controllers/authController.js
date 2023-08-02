"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileUser = exports.verifyToken = exports.refreshAuthToken = exports.loginAuth = exports.registerAuth = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db/db");
const registerAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const user = req.body;
        const userFind = yield (0, db_1.prisma)().users.findFirst({
            where: {
                email: email
            }
        });
        if (userFind)
            return res.status(400).json({ error: "Email already exists" });
        const hashPass = yield bcrypt_1.default.hash(password, 10);
        const userCreated = yield (0, db_1.prisma)().users.create({
            data: Object.assign(Object.assign({}, user), { password: hashPass })
        });
        const accessToken = jsonwebtoken_1.default.sign({ email: email, name: name, id: userCreated.id }, config_1.ACCESS_KEY, { expiresIn: '1h' });
        const refreshToken = jsonwebtoken_1.default.sign({ email: email, name: name, id: userCreated.id }, config_1.REFRESH_KEY, { expiresIn: '12h' });
        res.json({ accessToken: accessToken, refreshToken: refreshToken, email: email });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.registerAuth = registerAuth;
const loginAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userFind = yield (0, db_1.prisma)().users.findFirst({
            where: {
                email: email
            }
        });
        if (!userFind)
            return res.status(400).json({ error: "Email not found" });
        const valid = yield bcrypt_1.default.compare(password, userFind.password);
        if (!valid)
            return res.status(400).json({ error: "Invalid password" });
        const accessToken = jsonwebtoken_1.default.sign({ email: email, name: userFind.name, id: userFind.id }, config_1.ACCESS_KEY, { expiresIn: '1h' });
        const refreshToken = jsonwebtoken_1.default.sign({ email: email, name: userFind.name, id: userFind.id }, config_1.REFRESH_KEY, { expiresIn: '12h' });
        res.json({ accessToken: accessToken, refreshToken: refreshToken, email: email });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.loginAuth = loginAuth;
const refreshAuthToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let refreshToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!refreshToken)
            return res.status(401).json({ error: "Unauthorized: Token not provided" });
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.REFRESH_KEY);
        if (!decoded)
            return res.status(401).json({ error: "Unauthorized: Token not valid" });
        const accessToken = jsonwebtoken_1.default.sign({ email: decoded.email, name: decoded.name, id: decoded.id }, config_1.ACCESS_KEY, { expiresIn: '1h' });
        refreshToken = jsonwebtoken_1.default.sign({ email: decoded.email, name: decoded.name, id: decoded.id }, config_1.REFRESH_KEY, { expiresIn: '12h' });
        res.json({ accessToken: accessToken, refreshToken: refreshToken, email: decoded.email });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.refreshAuthToken = refreshAuthToken;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const accessToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!accessToken)
            return res.status(401).json({ error: "Unauthorized: Token not provided" });
        jsonwebtoken_1.default.verify(accessToken, config_1.ACCESS_KEY, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.status(401).json({ error: "ERROR VERIFY TOKEN" });
            if (!user)
                return res.status(401).json({ error: "Unauthorized: Token not valid" });
            res.locals.user = user;
            next();
        }));
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.verifyToken = verifyToken;
const updateProfileUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const { newName, newLast_name, newPassword } = req.body;
        const infoUser = yield (0, db_1.prisma)().users.findFirst({
            where: {
                email: user.email
            }
        });
        if (!infoUser)
            return res.status(400).json({ error: "User not found" });
        const updateData = {};
        if (newName)
            updateData.name = newName;
        if (newLast_name)
            updateData.last_name = newLast_name;
        if (newPassword) {
            const hashPass = yield bcrypt_1.default.hash(newPassword, 10);
            updateData.password = hashPass;
        }
        const updatedUser = yield (0, db_1.prisma)().users.update({
            where: {
                id: user.id
            },
            data: updateData
        });
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.updateProfileUser = updateProfileUser;
