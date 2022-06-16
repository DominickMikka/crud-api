"use strict";
exports.__esModule = true;
var http_1 = require("http");
var uuid_1 = require("uuid");
var users = [];
var server = (0, http_1.createServer)(function (request, response) {
    var body = '';
    if (request.url === '/api/user' && request.method === 'POST') {
        request.on('data', function (chunk) {
            body += chunk.toString();
        });
        request.on('end', function () {
            try {
                var _a = JSON.parse(body), username = _a.username, age = _a.age, hobbies = _a.hobbies;
                var user = {
                    id: (0, uuid_1.v4)(),
                    username: username,
                    age: age,
                    hobbies: hobbies
                };
                users.push(user);
                console.log(users);
                response.writeHead(201, { 'Content-Type': 'text/json' });
                response.end();
            }
            catch (error) {
                response.writeHead(400, { 'Content-Type': 'text/json' });
                response.end('No contains required fields');
            }
        });
    }
    if (request.url === '/api/users' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('<h1>Hello world!</h1>');
    }
    else {
        //response.writeHead(404, {'Content-Type': 'text/html'});
        //response.end('');
    }
});
var port = process.env.PORT || 5000;
server.listen(port, function () {
    console.log("Server port is ".concat(port));
});
