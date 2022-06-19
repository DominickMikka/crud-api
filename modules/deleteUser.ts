import { ServerResponse } from "http";
import { IUser } from "./interfaces";
import { getServerError } from './utils';

export const deleteUser = (response: ServerResponse, users: IUser[], userId?: string) => {
  try {
    let isExistsUser = false;

    users.forEach((element, index) => {
      if (element.id === userId) {
        users.splice(index, 1);
        response.writeHead(204, {'Content-Type': 'text/json'});
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