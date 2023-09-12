import { request } from "../hooks/api";

class UserService {
  // login service
  async getUsers() {
    try {
      const response = await request("users", "GET", {}, true, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
