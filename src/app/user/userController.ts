import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";

class UserController {
  static HelloWorld: RouteHandlerMethod = (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      reply.send({ message: "Hello World" });
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserController;
