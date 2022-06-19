import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuidv4 } from 'uuid';
import { IUser } from "./interfaces";
import { getServerError } from './utils';

export const createUser = (response: ServerResponse, request: IncomingMessage, body: string, users: IUser[]) => {
  try {
    request.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
  
    request.on('end', () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);
  
        if (username === undefined || age === undefined || hobbies === undefined ) {
          throw new Error();
        }
  
        const user: IUser = {
          id: uuidv4(),
          username,
          age,
          hobbies
        }
  
        users.push(user);
        
        response.writeHead(201, {'Content-Type': 'text/json'});
        response.end();
  
      } catch(error) {
        response.writeHead(400, {'Content-Type': 'text/json'});
        response.end('No contains required fields');
      }
    });
  } catch (error) {
    getServerError(response);
  }

}