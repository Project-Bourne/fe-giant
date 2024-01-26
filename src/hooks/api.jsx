import { Cookies } from "react-cookie";

const cookies = new Cookies();
let access = "";
let userUUID = "";
if (typeof window !== "undefined") {
  userUUID = cookies.get("uuid");
  if (userUUID === undefined) {
    userUUID = localStorage.getItem("uuid");
  }
  access =
    cookies.get("deep-access") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxNWFmNzQxLTBmZTItNGQ5My05MzdmLTJkOTYyYmZhYTdhOSIsImlhdCI6MTcwNjE0OTUyMywiZXhwIjoxNzA2MTUzMTIzfQ.tpMAO59wtw5CbkK0Gz71HHRuLfzPpRzYGDQVPCU1fTU";
}

const logout = () => {
  const access = cookies.get("deep-access");
  fetch("http://192.81.213.226:81/80/logout", {
    method: "POST",
    body: {
      refreshToken: access,
    },
  }).then((res) => {
    cookies.remove("deep-access");
    localStorage.clear();
    window.location.href = "/auth/login";
  });
};

export const requestHeader = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
  "deep-token": access,
  "user-id": userUUID, // user's ID
};

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Response Data;
 */

// const API_USER_URL = 'http://localhost:4040/'
const API_USER_URL = "http://192.81.213.226:81/80/";

export async function request(url, method, payload, token, text, form) {
  requestHeader["Content-Type"] =
    form === true ? "multipart/form-data" : "application/json";
  requestHeader["deep-token"] = token ? access : "";
  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then((res) => {
        if (res.status === 403) {
          // Redirect to the login page
          logout();
          throw new Error("Access forbidden. Redirecting to login page.");
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
        // return err;
      });
  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 403) {
          logout();
          throw new Error("Access forbidden. Redirecting to login page.");
          // Redirect to the login page
          // window.location.href = "/auth/login";
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
      });
  }
}
