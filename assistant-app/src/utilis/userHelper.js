"use client";
import Cookies from "js-cookie";


class UserHelper {
  getToken() {
    if (typeof window !== "undefined")
      return JSON.parse(localStorage.getItem("token"));
    else return null;
  }

  getUserId() {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("token"));
      return user?.id;
    } else return null;
  }

  setToken(token, force) {
    if (typeof window !== "undefined")
      localStorage.setItem("token", JSON.stringify(token));
    else return null;
  }

  removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  persistUser(data) {
    if (typeof window !== "undefined")
      localStorage.setItem("user", JSON.stringify(data));
  }

  getUser() {
    if (typeof window !== "undefined")
      return JSON.parse(localStorage.getItem("user"));
    else return null;
  }
  setCookies() {
    if (typeof window !== "undefined")
      Cookies.set("view", "viewAdded",  { 'max-age': 2 } );
  }
  getCookies() {
    if (typeof window !== "undefined") {
      const savedValue = Cookies.get("visited");
      if (savedValue) return savedValue;
      else return("")

    }
    return null;
  }
}
export default new UserHelper();
