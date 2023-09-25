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
    console.log("forgot password", data);
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

  async getUserViaAccessToken(token) {
    try {
      const response = await request(
        `token/user`,
        "GET",
        {},
        token,
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
    console.log("refresh token", data);
    console.log("user access token");
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
