import axios from "axios";
import { store } from "./app/store";
import { logout } from "./features/auth/authSlice";

const baseURL = process.env.REACT_APP_API;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    Authorization: localStorage.getItem("accessToken")
      ? "Bearer " + localStorage.getItem("accessToken")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        // console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/user/refresh-token", {
              refresh: refreshToken,
            })
            .then((response) => {
              localStorage.setItem("accessToken", response.data.access);
              localStorage.setItem("refreshToken", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          store.dispatch(logout());
          // console.log("Refresh token is expired", tokenParts.exp, now);
        }
      } else {
        store.dispatch(logout());
        // console.log("Refresh token not available.");
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
