import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { SignUpRequestBody } from "../../lib/types/auth";
import AuthManager from "./manager";
import { AUTH_CONSTANTS } from "../../lib/constants/auth";
import { HTTP_STATUS } from "../../lib/constants/api";

class AuthController {
  static signup: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      await AuthManager.signup(req.body as SignUpRequestBody);

      reply.send({ message: AUTH_CONSTANTS.SIGNUP_SUCCESS });
    } catch (error: any) {
      reply.status(HTTP_STATUS.BAD_REQUEST_400).send({ error: error.message });
    }
  };

  static login: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      const tokens = await AuthManager.login(req);

      reply.send(tokens);
    } catch (error: any) {
      reply.status(HTTP_STATUS.UNAUTHORIZED_401).send({ error: error.message });
    }
  };
}

export default AuthController;
