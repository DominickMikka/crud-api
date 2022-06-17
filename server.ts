import { createServer } from 'http';
import { config } from 'dotenv';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

config({ path: './.env' });

const port = process.env.PORT;

interface IUsers {
  id: string;
  username: string;
  age: number;
  hobbies: string[]; 
}

interface IUser {
	id: string;
	username: string;
	age: number;
  hobbies: string[]; 
}

const users: Array<IUsers> = [];

const server = createServer((request, response) => {
  let body = '';

  const route = request.url;
  const url = route?.includes('/api/users/$%7B');
  const userId = route?.slice(15, route.length - 3);
  const isUuid: boolean = uuidValidate(userId as string);

  if (url && isUuid && request.method === 'GET') {
    let isUserExists = false;

    users.forEach((element) => {
      if (element.id === userId) {
        response.writeHead(200, {'Content-Type': 'text/json'});
        response.write(JSON.stringify(element));
        response.end();
        isUserExists = true;
      }
    });

    if (!isUserExists) {
      response.writeHead(404, {'Content-Type': 'text/json'});
      response.end('This user doesn\'t exists!');
    }
    
  } else 
  
  if (url && !isUuid && request.method === 'GET') {
    response.writeHead(400, {'Content-Type': 'text/json'});
    response.end('User ID invalid!');
  }

  if (url && request.method === 'PUT') {

    if (!isUuid) {
      response.writeHead(404, {'Content-Type': 'text/json'});
      response.end('User ID invalid!');
    } else {

      let isUserExists = false;

      request.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
  
      request.on('end', () => {
        users.forEach((element) => {
  
          if (element.id === userId) {
            Object.assign(element, JSON.parse(body));
            response.writeHead(200, {'Content-Type': 'text/json'});
            response.end();
            isUserExists = true;
          }
        });
  
        if (!isUserExists) {
          response.writeHead(400, {'Content-Type': 'text/json'});
          response.end('No contains required fields');
        }
      });
    }
  }

  if (request.url === '/api/user' && request.method === 'POST') {
    
    request.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);

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
        console.log(error);
        response.writeHead(400, {'Content-Type': 'text/json'});
        response.end('No contains required fields');
      }
    });
  } else

  if (request.url === '/api/users' && request.method === 'GET') {
    response.writeHead(200, {'Content-Type': 'text/json'});

    if (users.length > 0) {
      response.write(JSON.stringify(users));
    }
    
    response.end();
  } /*else 
  
  {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end('');
  }*/

}).listen(port, () => {
  console.log(`Server port is ${port}`);
});