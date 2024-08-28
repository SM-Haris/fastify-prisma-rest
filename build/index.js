"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)({ logger: true });
app.get("/items", (req, res) => {
    res.send({ test: "Hello" });
});
const start = async () => {
    try {
        console.log(process.env.PORT);
        await app.listen(process.env.PORT);
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};
start();
