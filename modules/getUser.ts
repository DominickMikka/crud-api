import { ServerResponse } from "http";
import { IUser } from "./interfaces";
import { getServerError } from './utils';

export const getUser = (response: ServerResponse, users: IUser[], userId?: string) => {
  try {
    let isExistsUser = false;

    users.forEach((element) => {
      if (element.id === userId) {
        response.writeHead(200, {'Content-Type': 'text/json'});
        response.write(JSON.stringify(element));
        response.end();
        isExistsUser = true;
      }
    });
  
    if (!isExistsUser) {
      response.writeHead(404, {'Content-Type': 'text/json'});
      response.end('This user doesn\'t exists!');
    }
  } catch (error) {
    getServerError(response);
  }

}