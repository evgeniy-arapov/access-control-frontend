//import { baseUrl } from "./serverConfig";
import User from "models/user";

const fixture = {
  displayName: "Temp",
  email: "example@mail.com",
  jwt: "cdvdfsb chjdfsbvdjfsbvsdf",
  role: "user"
};

export function login (authData) {
  //return fetch(`${baseUrl}`, {
  //  method: "POST",
  //  body: authData
  //});
  
  console.log(authData);

  return new Promise(resolve => {
    setTimeout(resolve(new User(fixture)), 1000);
  });
}