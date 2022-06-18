import { createServer } from 'http';
import { config } from 'dotenv';
import { validate as uuidValidate } from 'uuid';

import { checkMethod,  } from './modules/utils';
import { getAllUsers } from './modules/getAllUsers';
import { createUser } from './modules/createUser';
import { updateUser } from './modules/updateUser';
import { getUser } from './modules/getUser';
import { deleteUser } from './modules/deleteUser';
import { IUser } from './modules/interfaces';

config({ path: './.env' });

const port = process.env.PORT;

createServer((request, response) => {
  const users: Array<IUser> = [];

  const body = '';

  const route = request.url;
  const method = request.method;
  const url = route?.includes('/api/users/$%7B');
  const userId = route?.slice(15, route.length - 3);
  const isUuid: boolean = uuidValidate(userId as string);

  if (url && isUuid && checkMethod(method, 'GET')) {
    getUser(response, users, userId);
    /*response.writeHead(404, {'Content-Type': 'text/json'});
    response.end('This user doesn\'t exists!');*/

  } else 
  
  if (url && !isUuid && checkMethod(method, 'GET')) {
    response.writeHead(400, {'Content-Type': 'text/json'});
    response.end('User ID invalid!');
  }

  if (url && isUuid && request.method === 'DELETE') {
    deleteUser(response, users, userId)
    /*response.writeHead(400, {'Content-Type': 'text/json'});
    response.end('User ID invalid!');*/
  }

  if (url && checkMethod(method, 'PUT')) {
    if (!isUuid) {
      response.writeHead(404, {'Content-Type': 'text/json'});
      response.end('User ID invalid!');
    } else {
      updateUser(response, request, body, users, userId);
    }
  } else

  if (request.url === '/api/user' && checkMethod(method, 'POST')) {
    createUser(response, request, body, users);
  } else

  if (request.url === '/api/users' && checkMethod(method, 'GET')) {
    getAllUsers(response, users);
  } else {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end('Error: invalid endpoint!');
  }

}).listen(port, () => console.log(`Server started, port: ${port}`));