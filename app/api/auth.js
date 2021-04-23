import { apiRootUrl, defaultHeaders as headers } from "./serverConfig";

export function login (authData) {
  return fetch(`${apiRootUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify(authData), // данные могут быть 'строкой' или {объектом}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => transformFetchToJSON(res));
}

export function logout () {
  return fetch(`${apiRootUrl}/auth/logout`, {
    method: "GET",
    headers
  })
    .then(res => transformFetchToJSON(res));
}

export function register (authData) {
  return fetch(`${apiRootUrl}/auth/register`, {
    method: "POST",
    body: authData
  })
    .then(res => transformFetchToJSON(res));
}

function transformFetchToJSON (res) {
  let response = res;
  return res.json()
    .then(json => {
      return {
        statusCode: response.statusCode,
        status: response.status,
        statusMessage: response.statusMessage,
        body: json
      };
    });
}
