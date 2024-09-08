import { findByNameOrEmail } from "./service";
import { AUTH_CONSTANTS } from "../auth/constants";
import Exception from "../../lib/helpers/Exception";
import { HTTP_STATUS } from "../../lib/constants/api";

export const ThrowIfUserExists = async (username: string, email: string) => {
  const user = await findByNameOrEmail(username, email);

  if (user) {
    throw new Exception(
      AUTH_CONSTANTS.SIGNUP_FAILURE,
      HTTP_STATUS.BAD_REQUEST_400
    );
  }
};
