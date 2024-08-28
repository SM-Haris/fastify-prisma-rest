import { FastifyInstance } from "fastify";
import UserController from "../app/user/userController";
import AuthenticationMiddleware from "../middlewares/auth";
import { HealthSchema } from "../lib/schemas/user";

// Define user routes as a Fastify plugin
const userRoutes = async (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/health",
    schema: HealthSchema,
    preHandler: AuthenticationMiddleware.AuthMiddleware,
    handler: UserController.HelloWorld,
  });
};

export default userRoutes;
