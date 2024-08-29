import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import prisma from "../../lib/helpers/prisma";

class UserController {
  static currentUser: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: req.user as string,
        },
      });

      reply.send({ user: user });
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserController;
