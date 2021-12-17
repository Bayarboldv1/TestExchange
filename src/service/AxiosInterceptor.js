import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const instance = axios.create();

instance.interceptors.request.use(
  async (req) => {
    if (req.url.includes("/auth/signin")) {
      req.headers["Content-type"] = "application/x-www-form-urlencoded";
    } else {
      req.headers["content-type"] = "application/json";
    }
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user.auth) {
      req.headers["Authorization"] = `Bearer ${user.token}`;
    }

    return req;
  },
  (err) => {
    Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // const history = useHistory();
    // if (err.response.status === 401) {
    //     history.push("/login");
    // }
    return Promise.reject(err);
  }
);
