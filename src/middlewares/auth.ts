import { FastifyReply, FastifyRequest, onRequestHookHandler } from "fastify";

class AuthenticationMiddleware {
  static AuthMiddleware: onRequestHookHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    console.log(req);
    console.log(reply);
    console.log("I am in middleware");
  };
}

export default AuthenticationMiddleware;
