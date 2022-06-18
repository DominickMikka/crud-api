import { ServerResponse } from "http";
import { IUser } from "./interfaces";

export const getAllUsers = (response: ServerResponse, users: IUser[]) => {
  response.writeHead(200, {'Content-Type': 'text/json'});

  if (users.length > 0) {
    response.write(JSON.stringify(users));
  }
  
  response.end();
}