import { createServer } from 'http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

interface IUsers {
  id: string;
  username: string;
  age: number;
  hobbies: string[]; 
}

const users: Array<IUsers> = [];
//const users: object[] = [];

interface IUser {
	id: string;
	username: string;
	age: number;
  hobbies: string[]; 
}


const server = createServer((request, response) => {
  let body = '';

  const route = request.url;
  const url = route?.includes('/api/users/$%7B');
  const userId = route?.slice(15, route.length - 3);
  const isUuid: boolean = uuidValidate(userId as string);

  if (url && isUuid && request.method === 'GET') {

    users.forEach((element) => {
      if (element.id === userId) {
        response.writeHead(200, {'Content-Type': 'text/json'});
        response.write(JSON.stringify(element));
        response.end();
      }
    });
    
  } else

  if (request.url === '/api/user' && request.method === 'POST') {
    

    request.on('data', (chunk: Buffer) => {
      body += chunk.toString();
      console.log(body);
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
  } else 
  
  {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end('');
  }

});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server port is ${port}`);
});