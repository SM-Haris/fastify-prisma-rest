import { FastifyRequest } from "fastify";
import { ComparePassword, EncryptPassword } from "../../lib/helpers/bcrypt";
import { LoginRequestBody, SignUpRequestBody } from "../../lib/types/auth";
import { createUser, findUserByEmail } from "../user/service";
import { getAuthTokens } from "../../lib/helpers/jwt";
import { AUTH_CONSTANTS } from "../../lib/constants/auth";
import { ThrowIfUserExists } from "../../lib/utilts/user";

class AuthManager {
  static signup = async (data: SignUpRequestBody) => {
    try {
      await ThrowIfUserExists(data.username, data.email);

      const encryptedPassword = await EncryptPassword(data.password);

      await createUser({ ...data, password: encryptedPassword });
    } catch (error) {
      throw new Error(AUTH_CONSTANTS.SIGNUP_FAILURE);
    }
  };

  static login = async (req: FastifyRequest) => {
    try {
      const data = req.body as LoginRequestBody;

      const user = await findUserByEmail(data.email);

      await ComparePassword(data.password, user.password);

      return getAuthTokens(req, user.id);
    } catch {
      throw new Error(AUTH_CONSTANTS.LOGIN_FAILURE);
    }
  };
}

export default AuthManager;
