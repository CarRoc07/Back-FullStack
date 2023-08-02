"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("../routes/auth.router"));
const products_route_1 = __importDefault(require("../routes/products.route"));
const orders_router_1 = __importDefault(require("../routes/orders.router"));
const category_router_1 = __importDefault(require("../routes/category.router"));
const config_1 = require("../config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', auth_router_1.default);
app.use('/api', products_route_1.default);
app.use('/api', orders_router_1.default);
app.use('/api', category_router_1.default);
app.listen(config_1.PORT, () => {
    console.log('Server is running');
});
