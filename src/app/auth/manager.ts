import { FastifyRequest } from "fastify";
import { ComparePassword } from "../../lib/helpers/bcrypt";
import { LoginRequestBody, SignUpRequestBody } from "../../lib/types/auth";
import { createUser, findUserByEmail } from "../user/service";
import { getAuthTokens } from "../../lib/helpers/jwt";
import { AUTH_CONSTANTS } from "../../lib/constants/auth";
import { ThrowIfUserExists } from "../../lib/utilts/user";

class AuthManager {
  static signup = async (data: SignUpRequestBody) => {
    try {
      await ThrowIfUserExists(data.username, data.email);

      await createUser(data);
    } catch {
      throw new Error(AUTH_CONSTANTS.SIGNUP_FAILURE);
    }
  };

  static login = async (req: FastifyRequest) => {
    try {
      const data = req.body as LoginRequestBody;

      const user = await findUserByEmail(data.email);

      ComparePassword(user.password, data.password);

      return getAuthTokens(req, user.id);
    } catch {
      throw new Error(AUTH_CONSTANTS.LOGIN_FAILURE);
    }
  };
}

export default AuthManager;
