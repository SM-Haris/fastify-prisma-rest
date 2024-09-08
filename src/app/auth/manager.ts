import { FastifyRequest } from "fastify";
import { ComparePassword, EncryptPassword } from "../../lib/helpers/bcrypt";
import { LoginRequestBody, SignUpRequestBody } from "./types";
import { createUser, findUserByEmail } from "../user/service";
import { getAuthTokens } from "../../lib/helpers/jwt";
import { AUTH_CONSTANTS } from "./constants";
import { ThrowIfUserExists } from "../user/utils";
import Exception from "../../lib/helpers/Exception";
import { HTTP_STATUS } from "../../lib/constants/api";

class AuthManager {
  static signup = async (data: SignUpRequestBody) => {
    try {
      await ThrowIfUserExists(data.username, data.email);

      const encryptedPassword = await EncryptPassword(data.password);

      await createUser({ ...data, password: encryptedPassword });
    } catch (error: any) {
      throw new Exception(
        error?.errorMessage || AUTH_CONSTANTS.SIGNUP_FAILURE,
        error?.statusCode || HTTP_STATUS.BAD_REQUEST_400
      );
    }
  };

  static login = async (req: FastifyRequest) => {
    try {
      const data = req.body as LoginRequestBody;

      const user = await findUserByEmail(data.email);

      if (!user) {
        throw new Exception(AUTH_CONSTANTS.LOGIN_FAILURE);
      }

      await ComparePassword(data.password, user.password);

      return getAuthTokens(req, user.id);
    } catch (error: any) {
      throw new Exception(
        error?.errorMessage || AUTH_CONSTANTS.LOGIN_FAILURE,
        error?.statusCode || HTTP_STATUS.UNAUTHORIZED_401
      );
    }
  };
}

export default AuthManager;
