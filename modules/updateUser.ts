import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "./interfaces";
import { getServerError } from './utils';

export const updateUser = (response: ServerResponse, request: IncomingMessage, body: string, users: IUser[], userId?: string) => {
  try {
    let isExistsUser = false;

    request.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
    
    request.on('end', () => {
      users.forEach((element) => {
        if (element.id === userId) {
          Object.assign(element, JSON.parse(body));
          response.writeHead(200, {'Content-Type': 'text/json'});
          response.end();
          isExistsUser = true;
        }
      });
    
      if (!isExistsUser) {
        response.writeHead(404, {'Content-Type': 'text/json'});
        response.end('This user doesn\'t exists!');
      }
    });
  } catch (error) {
    getServerError(response);
  }

}