import { fetchSingleUser } from "./service";

class UserManager {
  static currentUser = async (user_id: string) => {
    try {
      const user = fetchSingleUser(user_id);

      return user;
    } catch (error) {
      //log it into audit file
      console.log(error);
      //move to a constant file
      throw new Error("User is not authorized");
    }
  };
}

export default UserManager;
