import { createServer } from 'http';
import { config } from 'dotenv';
import { validate as uuidValidate } from 'uuid';

import { checkMethod, getServerError } from './modules/utils';
import { getAllUsers } from './modules/getAllUsers';
import { createUser } from './modules/createUser';
import { updateUser } from './modules/updateUser';
import { getUser } from './modules/getUser';
import { deleteUser } from './modules/deleteUser';
import { IUser } from './modules/interfaces';

config({ path: './.env' });

const port = process.env.PORT;
const users: Array<IUser> = [];
createServer((request, response) => {
  
  const body = '';
  const route = request.url;
  const method = request.method;
  const url = route?.includes('/api/users/$%7B');

  if (url) {

    const userId = route?.slice(15, route.length - 3);
    const isUuid: boolean = uuidValidate(userId as string);

    if (checkMethod(method, 'GET')) {

      if (isUuid) {
        getUser(response, users, userId);
      } else {
        response.writeHead(400, {'Content-Type': 'text/json'});
        response.end('User ID invalid!');
      }

    } else 
    
    if (checkMethod(method, 'PUT')) {

      if (isUuid) {
        updateUser(response, request, body, users, userId);
      } else {
        response.writeHead(400, {'Content-Type': 'text/json'});
        response.end('User ID invalid!');
      }

    } else

    if (checkMethod(method, 'DELETE')) {

      if (isUuid) {
        deleteUser(response, users, userId);
      } else {
        response.writeHead(400, {'Content-Type': 'text/json'});
        response.end('User ID invalid!');
      }
    } else {
      getServerError(response);
    }

  } else 

  if (route === '/api/user') {

    if (checkMethod(method, 'POST')) {
      createUser(response, request, body, users);
    } else {
      getServerError(response);
    }

  } else

  if (route === '/api/users') {
    
    if (checkMethod(method, 'GET')) {
      getAllUsers(response, users);
    } else {
      getServerError(response);
    }

  } else {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end('Error: invalid endpoint!');
  }

}).listen(port, () => console.log(`Server started, port: ${port}`));