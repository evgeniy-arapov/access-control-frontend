export const rootUrl = "http://localhost";
export const port = 3000;
export const baseUrl = `${rootUrl}:${port}`;
export const apiRootUrl = `${baseUrl}/api`;

export const defaultHeaders = new Headers({
  "Content-Type": "application/vnd.api+json"
});