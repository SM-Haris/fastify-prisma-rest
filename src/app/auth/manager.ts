import { FastifyRequest } from "fastify";
import { ComparePassword } from "../../lib/helpers/bcrypt";
import { LoginRequestBody, SignUpRequestBody } from "../../lib/types/auth";
import { createUser, findUserByEmail } from "../user/service";
import { getAuthTokens } from "../../lib/helpers/jwt";

class AuthManager {
  static signup = async (data: SignUpRequestBody) => {
    try {
      await createUser(data);
    } catch (error) {
      //log it into audit file
      console.log(error);
      //move to a constant file
      throw new Error("User with this username/email already exists");
    }
  };

  static login = async (req: FastifyRequest) => {
    try {
      const data = req.body as LoginRequestBody;

      const user = await findUserByEmail(data.email);

      ComparePassword(user.password, data.password);

      return getAuthTokens(req, user.id);
    } catch (error) {
      //log it into audit file
      console.log(error);
      //move to a constant file
      throw new Error("No active users with thse credentials exists");
    }
  };
}

export default AuthManager;
