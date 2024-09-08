import { FastifyInstance } from "fastify";
import UserController from "./controller";
import { currentUserSchema } from "./schemas";
import { authenticationMiddleware } from "../../middlewares/auth";

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
