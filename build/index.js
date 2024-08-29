"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const logging_1 = require("./middlewares/logging");
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.register(jwt_1.default, {
    secret: process.env.JWT_SECRET || "supersecret",
});
fastify.decorate("authenticate", auth_1.default.AuthMiddleware);
// Middleware for logging every request
fastify.addHook("onRequest", logging_1.AuditLogger);
// Error handler for logging errors
fastify.setErrorHandler(logging_1.ErrorLogger);
// Example route
fastify.get("/", (req, res) => {
    res.send({ test: "Hello World" });
});
for (const [prefix, route] of Object.entries(routes_1.routes)) {
    fastify.register(route, { prefix });
}
const start = async () => {
    try {
        await fastify.listen({ port: Number(process.env.PORT) });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
exports.default = fastify;
