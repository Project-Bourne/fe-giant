import { request } from "../hooks/api";

class AuthService {
  // get user roles
  async getRoles() {
    try {
      const response = await request("roles", "GET", {}, false, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // login service
  async login(data) {
    try {
      const response = await request(
        "login",
        "POST",
        data,
        false,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // sign up service
  async signUp(data) {
    try {
      const response = await request(
        "register",
        "POST",
        data,
        false,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // forgot - password
  async forgotPassword(data) {
    try {
      const response = await request(
        "forgot-password",
        "POST",
        data,
        false,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // reset - password
  async resetPassword(data) {
    try {
      const response = await request(
        "reset-password",
        "POST",
        data,
        false,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async feedback(data) {
    try {
      const response = await request(
        "feedback",
        "POST",
        data,
        false,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUserInfo(data, id) {
    try {
      const response = await request(
        `user/${id}`,
        "PUT",
        data,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async editPhoto(data) {
    try {
      const response = await request(`avatar`, "PUT", data, true, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserViaAccessToken() {
    try {
      const response = await request(
        `token/user`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // logout
  async logout(data) {
    try {
      const response = await request(
        "logout",
        "POST",
        data,
        false,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
