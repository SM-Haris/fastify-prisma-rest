import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import UserManager from "./manager";
import { HTTP_STATUS } from "../../lib/constants/api";
import { USER_CONSTANTS } from "./constants";

class UserController {
  static currentUser: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const user = await UserManager.currentUser(req.user as string);

      reply.send({ user: user });
    } catch (error: any) {
      reply
        .status(error?.statusCode || HTTP_STATUS.BAD_REQUEST_400)
        .send({
          error: error?.errorMessage || USER_CONSTANTS.CURRENT_USER_FAILURE,
        });
    }
  };
}

export default UserController;
