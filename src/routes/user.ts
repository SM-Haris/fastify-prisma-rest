import { FastifyInstance } from "fastify";
import UserController from "../app/user/userController";
import { currentUserSchema } from "../lib/schemas/user";

const userRoutes = async (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/me",
    schema: currentUserSchema,
    //@ts-expect-error authenticate object does not exists on app's instance
    preHandler: [app?.authenticate],
    handler: UserController.currentUser,
  });
};

export default userRoutes;
