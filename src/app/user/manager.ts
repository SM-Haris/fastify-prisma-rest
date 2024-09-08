import { HTTP_STATUS } from "../../lib/constants/api";
import Exception from "../../lib/helpers/Exception";
import { USER_CONSTANTS } from "./constants";
import { fetchSingleUser } from "./service";

class UserManager {
  static currentUser = async (user_id: string) => {
    try {
      const user = fetchSingleUser(user_id);

      if (!user) {
        throw new Exception(
          USER_CONSTANTS.USER_NOT_FOUND,
          HTTP_STATUS.UNAUTHORIZED_401
        );
      }

      return user;
    } catch (error: any) {
      throw new Exception(
        error?.errorMessage || USER_CONSTANTS.CURRENT_USER_FAILURE,
        error?.statusCode || HTTP_STATUS.UNAUTHORIZED_401
      );
    }
  };
}

export default UserManager;
