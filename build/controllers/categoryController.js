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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const db_1 = require("../db/db");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, db_1.prisma)().category.findMany();
        if (!categories)
            return res.status(500).json({ error: 'Categories not exists' });
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getCategories = getCategories;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.body;
        yield (0, db_1.prisma)().category.create({
            data: category
        });
        res.json({ message: 'Category created' });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createCategory = createCategory;
