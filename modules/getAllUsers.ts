import { ServerResponse } from "http";
import { IUser } from "./interfaces";
import { getServerError } from './utils';

export const getAllUsers = (response: ServerResponse, users: IUser[]) => {
  try {
    response.writeHead(200, {'Content-Type': 'text/json'});

    if (users.length > 0) {
      response.write(JSON.stringify(users));
    }
    
    response.end();
  } catch (error) {
    getServerError(response);
  }

}