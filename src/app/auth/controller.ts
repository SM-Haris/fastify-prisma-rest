import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { SignUpRequestBody } from "./types";
import AuthManager from "./manager";
import { AUTH_CONSTANTS } from "./constants";
import { HTTP_STATUS } from "../../lib/constants/api";

class AuthController {
  static signup: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      await AuthManager.signup(req.body as SignUpRequestBody);

      reply
        .status(HTTP_STATUS.OK_200)
        .send({ message: AUTH_CONSTANTS.SIGNUP_SUCCESS });
    } catch (error: any) {
      reply
        .status(error?.statusCode || HTTP_STATUS.BAD_REQUEST_400)
        .send({ error: error?.errorMessage || AUTH_CONSTANTS.SIGNUP_FAILURE });
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
      reply
        .status(error?.statusCode || HTTP_STATUS.UNAUTHORIZED_401)
        .send({ error: error?.errorMessage || AUTH_CONSTANTS.LOGIN_FAILURE });
    }
  };
}

export default AuthController;
