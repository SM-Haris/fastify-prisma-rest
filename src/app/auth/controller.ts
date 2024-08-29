import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { SignUpRequestBody } from "../../lib/types/auth";
import AuthManager from "./manager";

class AuthController {
  static signup: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      await AuthManager.signup(req.body as SignUpRequestBody);

      reply.send({ message: "User created successfully" });
    } catch (error: any) {
      console.log(error);
      reply.status(400).send({ error: error.message });
    }
  };

  static login: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const tokens = await AuthManager.login(req);

      reply.send(tokens);
    } catch (error: any) {
      reply.status(401).send({ error: error.message });
    }
  };
}

export default AuthController;
