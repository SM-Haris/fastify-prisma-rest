import { FastifyInstance } from "fastify";
import UserController from "../app/user/controller";
import { currentUserSchema } from "../lib/schemas/user";
import { authenticationMiddleware } from "../middlewares/auth";

const userRoutes = async (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/me",
    schema: currentUserSchema,
    preHandler: [authenticationMiddleware],
    handler: UserController.currentUser,
  });
};

export default userRoutes;
