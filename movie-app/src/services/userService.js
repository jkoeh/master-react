import config from "../config.json";
import http from "./httpService";

const usersUrl = id => {
  const url = config.apiEndPoint + "/users";
  if (id) {
    return url + "/" + id;
  }
  return url;
};

export function register(data) {
  const user = {
    email: data.username,
    password: data.password,
    name: data.name
  };

  return http.post(usersUrl(), user);
}
