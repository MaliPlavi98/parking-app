import http from "./http";

export function apiLogin(data) {
  return http("POST", "/auth/login", data);
}

export function apiRegister(data) {
  return http("POST", "/auth/register", data);
}

export function apiLogout() {
  return http("POST", "/auth/logout");
}

export function apiMe() {
  return http("GET", "/auth/me");
}

