"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../app/auth/controller"));
const auth_1 = require("../lib/schemas/auth");
const authRoutes = async (app) => {
    app.route({
        method: "POST",
        url: "/signup",
        schema: auth_1.signupSchema,
        handler: controller_1.default.signup,
    });
    app.route({
        method: "POST",
        url: "/login",
        schema: auth_1.loginSchema,
        handler: controller_1.default.login,
    });
};
exports.default = authRoutes;
