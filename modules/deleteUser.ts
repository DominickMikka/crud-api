import { ServerResponse } from "http";
import { IUser } from "./interfaces";

export const deleteUser = (response: ServerResponse, users: IUser[], userId?: string) => {
  users.forEach((element, index) => {
    console.log(userId);
    if (element.id === userId) {
      users.splice(index, 1);
      response.writeHead(204, {'Content-Type': 'text/json'});
      response.end();
    }
  });
}