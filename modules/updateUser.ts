import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "./interfaces";

export const updateUser = (response: ServerResponse, request: IncomingMessage, body: string, users: IUser[], userId?: string) => {
    request.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
  
    request.on('end', () => {
      users.forEach((element) => {
        if (element.id === userId) {
          Object.assign(element, JSON.parse(body));
          response.writeHead(200, {'Content-Type': 'text/json'});
          response.end();
        }
      });
  
      /*response.writeHead(400, {'Content-Type': 'text/json'});
      response.end('This user doesn\'t exists!');*/
    });
  }