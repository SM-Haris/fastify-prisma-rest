import { USER_CONSTANTS } from "../../lib/constants/user";
import { fetchSingleUser } from "./service";

class UserManager {
  static currentUser = async (user_id: string) => {
    try {
      const user = fetchSingleUser(user_id);

      return user;
    } catch {
      throw new Error(USER_CONSTANTS.CURRENT_USER_FAILURE);
    }
  };
}

export default UserManager;
