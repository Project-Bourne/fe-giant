import { Cookies } from "react-cookie";
// import { cookies as treats } from "next/headers";

const cookies = new Cookies();
let access = "";
let userUUID = "";
if (typeof window !== "undefined") {
  userUUID = cookies.get("uuid");
  if (userUUID === undefined) {
    userUUID = localStorage.getItem("uuid");
  }
  access = cookies.get("deep-access");
}

const logout = () => {
  const access = cookies.get("deep-access");
  fetch(
    // "http://192.81.213.226:81/80/logout",
    `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/80/logout`,
    {
      method: "POST",
      body: {
        refreshToken: access,
      },
    },
  ).then((res) => {
    cookies.remove("deep-access");
    cookies.remove("uuid");
    localStorage.clear();
    requestHeader["deep-token"] = "";
    requestHeader["user-id"] = "";
    window.location.replace("/auth/login");
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
// const API_USER_URL = "http://192.81.213.226:81/80/";
const API_USER_URL = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/80/`;

export async function request(url, method, payload, token, text, form) {
  requestHeader["Content-Type"] =
    form === true ? "multipart/form-data" : "application/json";
  requestHeader["deep-token"] = access || "";
  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then((res) => {
        if (res.status === 403) {
          // Redirect to the login page
          logout();
          cookies.remove("deep-access");
          cookies.remove("uuid");
          localStorage.clear();
          requestHeader["deep-token"] = "";
          requestHeader["user-id"] = "";
          // treats().delete("deep-access");
          // treats().delete("uuid");
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
          // Redirect to the login page
          // window.location.replace("/auth/login");
          cookies.remove("deep-access");
          cookies.remove("uuid");
          localStorage.clear();
          requestHeader["deep-token"] = "";
          requestHeader["user-id"] = "";
          // treats().delete("deep-access");
          // treats().delete("uuid");
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
      });
  }
}
