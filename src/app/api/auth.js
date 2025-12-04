import http from "./http";

export function apiLogin(data) {
  return http("POST", "/auth/login", data);
}

export function register(data) {
  return http("POST", "/auth/register", data);
}