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
exports.deleteProduct = exports.createProduct = exports.getAllProducts = void 0;
const db_1 = require("../db/db");
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, db_1.prisma)().product.findMany();
        res.json(products);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAllProducts = getAllProducts;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const newProduct = yield (0, db_1.prisma)().product.create({
            data: product
        });
        res.json(newProduct);
    }
    catch (error) {
        res.status(500).send({ "error": "Error creating product" });
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedProduct = yield (0, db_1.prisma)().product.delete({
            where: {
                id: Number(id)
            }
        });
        if (!deletedProduct)
            return res.status(404).send({ "error": "Product not found" });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send({ "error": "Error deleting product" });
    }
});
exports.deleteProduct = deleteProduct;
