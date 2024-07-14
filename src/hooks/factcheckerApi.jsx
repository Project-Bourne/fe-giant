// import { useRouter } from 'next/router';

/**
 * Object Request Header
 */
import NotificationService from "@/services/notification.service";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
let access = "";

if (typeof window !== "undefined") {
  access = cookies.get("deep-access");
}
export const requestHeader = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
  "deep-token": access,
};

const logout = () => {
  const access = cookies.get("deep-access");
  fetch("http://192.81.213.226:81/80/logout", {
    method: "POST",
    body: {
      refreshToken: access,
    },
  }).then((res) => {
    cookies.remove("deep-access");
    cookies.remove("uuid");
    localStorage.clear();
    window.location.replace("/auth/login");
  });
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
 *
 */

let API_USER_URL = "http://192.81.213.226:81/84";
export async function factCheckRequest(
  url,
  method,
  payload,
  token,
  text,
  form,
) {
  requestHeader["Content-Type"] =
    form === true ? "multipart/form-data" : "application/json";

  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then(async (res) => {
        if (res.status === 403) {
          // Redirect to the login page
          // window.location.href = "/auth/login";
          // throw new Error("Access forbidden. Redirecting to login page.");
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
        return Promise.reject(err);
      });
  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then(async (res) => {
        if (res.status === 403) {
          logout();
          throw new Error("Access forbidden. Redirecting to login page.");
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}:`, err);
        return Promise.reject(err);
      });
  }
}
