import { createServer } from 'http';
import { v4 as uuidv4 } from 'uuid';

let users: object[] = [];

interface IUsers {
	id: string;
	username: string;
	age: number;
  hobbies: string[];
}

const server = createServer((request, response) => {
  
  let body: string = '';

  if (request.url === '/api/user' && request.method === 'POST') {
    
    request.on('data', (chunk) => {
      body += chunk.toString();
    })

    request.on('end', () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);

        const user: IUsers = {
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
  } else

  if (request.url === '/api/users' && request.method === 'GET') {
    response.writeHead(200, {'Content-Type': 'text/json'});

    if (users.length > 0) {
      response.write(JSON.stringify(users));
    }
    
    response.end();
  } else {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end('');
  }

})

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server port is ${port}`);
});