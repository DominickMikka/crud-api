import { ServerResponse } from "http";
import { IUser } from "./interfaces";

export const getUser = (response: ServerResponse, users: IUser[], userId?: string) => {
  users.forEach((element) => {
    if (element.id === userId) {
      response.writeHead(200, {'Content-Type': 'text/json'});
      response.write(JSON.stringify(element));
      response.end();
    }
  });
}