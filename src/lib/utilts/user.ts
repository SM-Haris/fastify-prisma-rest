import { findByNameOrEmail } from "../../app/user/service";
import { AUTH_CONSTANTS } from "../constants/auth";

export const ThrowIfUserExists = async (username: string, email: string) => {
  const user = await findByNameOrEmail(username, email);

  if (user) {
    throw new Error(AUTH_CONSTANTS.SIGNUP_FAILURE);
  }

  return;
};
