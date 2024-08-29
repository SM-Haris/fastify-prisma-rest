"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = __importDefault(require("./manager"));
class AuthController {
}
_a = AuthController;
AuthController.signup = async (req, reply) => {
    try {
        await manager_1.default.signup(req.body);
        reply.send({ message: "User created successfully" });
    }
    catch (error) {
        console.log(error);
        reply.status(400).send({ error: error.message });
    }
};
AuthController.login = async (req, reply) => {
    try {
        const tokens = await manager_1.default.login(req);
        reply.send(tokens);
    }
    catch (error) {
        reply.status(401).send({ error: error.message });
    }
};
exports.default = AuthController;
