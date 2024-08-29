import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import UserManager from "./manager";

class UserController {
  static currentUser: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const user = await UserManager.currentUser(req.user as string);

      reply.send({ user: user });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  };
}

export default UserController;