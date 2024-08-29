import Fastify from "fastify";
import dotenv from "dotenv";
import { routes } from "./routes";
import fastifyJWT from "@fastify/jwt";
import Authentication from "./middlewares/auth";
import { AuditLogger, ErrorLogger } from "./middlewares/logging";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyJWT, {
  secret: process.env.JWT_SECRET || "supersecret",
});

fastify.decorate("authenticate", Authentication.AuthMiddleware);

// Middleware for logging every request
fastify.addHook("onRequest", AuditLogger);

// Error handler for logging errors
fastify.setErrorHandler(ErrorLogger);

// Example route
fastify.get("/", (req, res) => {
  res.send({ test: "Hello World" });
});

for (const [prefix, route] of Object.entries(routes)) {
  fastify.register(route, { prefix });
}

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export default fastify;
