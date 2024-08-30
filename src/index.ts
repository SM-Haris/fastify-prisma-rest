import Fastify from "fastify";
import dotenv from "dotenv";
import { routes } from "./routes";
import fastifyJWT from "@fastify/jwt";
import { AuditLogger, ErrorLogger } from "./middlewares/logging";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyJWT, {
  secret: process.env.JWT_SECRET || "supersecret",
});

// Register @fastify/swagger plugin.
fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify Prisma API",
      description: "Fastify Prisma API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    tags: [
      {
        name: "Root",
        description: "Root endpoints",
      },
    ],
  },
});

// Register @fastify/swagger-ui plugin.
fastify.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (_request, _reply, next) {
      next();
    },
    preHandler: function (_request, _reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

// Middleware for logging every request
fastify.addHook("onRequest", AuditLogger);

// Error handler for logging errors
fastify.setErrorHandler(ErrorLogger);

// Example route
fastify.get("/", {
  schema: {
    description: "Root endpoint",
    tags: ["default"],
    summary: "Returns a Hello World message",
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: (req, res) => {
    res.send({ message: "Hello World" });
  },
});

for (const [prefix, route] of Object.entries(routes)) {
  fastify.register(route, { prefix });
}

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) });
    fastify.swagger();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export default fastify;
