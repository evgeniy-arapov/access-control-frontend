import { apiRootUrl, defaultHeaders as headers } from "./serverConfig";

export function login (authData) {
  return fetch(`${apiRootUrl}/auth/login`, {
    method: "POST",
    body: authData
  });
}

export function logout () {
  return fetch(`${apiRootUrl}/auth/logout`, {
    method: "GET",
    headers
  });
}

export function register (authData) {
  return fetch(`${apiRootUrl}/auth/register`, {
    method: "POST",
    body: authData
  });
}