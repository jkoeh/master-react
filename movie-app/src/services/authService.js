import config from "../config.json";
import http from "./httpService";
import jwt_decode from "jwt-decode";

const authUrl = config.apiEndPoint + "/auth";
const tokenKey = "token";
http.setJwt(getJwt());
export async function login(username, password) {
  const { data: jwt } = await http.post(authUrl, { email: username, password });
  localStorage.setItem(tokenKey, jwt);
}
export function getJwt() {
  const jwt = localStorage.getItem("token");
  return jwt;
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwt_decode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}
export function logOut() {
  localStorage.removeItem("token");
}
export default {
  login,
  getCurrentUser,
  logOut,
  getJwt
};
