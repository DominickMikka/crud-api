"use strict";
exports.__esModule = true;
var http_1 = require("http");
var dotenv_1 = require("dotenv");
var uuid_1 = require("uuid");
var utils_1 = require("./modules/utils");
(0, dotenv_1.config)({ path: './.env' });
var port = process.env.PORT;
var users = [];
(0, http_1.createServer)(function (request, response) {
    var body = '';
    var route = request.url;
    var method = request.method;
    var url = route === null || route === void 0 ? void 0 : route.includes('/api/users/$%7B');
    var userId = route === null || route === void 0 ? void 0 : route.slice(15, route.length - 3);
    var isUuid = (0, uuid_1.validate)(userId);
    if (url && isUuid && (0, utils_1.checkMethod)(method, 'GET')) {
        users.forEach(function (element) {
            if (element.id === userId) {
                response.writeHead(200, { 'Content-Type': 'text/json' });
                response.write(JSON.stringify(element));
                response.end();
            }
        });
        /*response.writeHead(404, {'Content-Type': 'text/json'});
        response.end('This user doesn\'t exists!');*/
    }
    else if (url && !isUuid && (0, utils_1.checkMethod)(method, 'GET')) {
        response.writeHead(400, { 'Content-Type': 'text/json' });
        response.end('User ID invalid!');
    }
    if (url && isUuid && request.method === 'DELETE') {
        users.forEach(function (element, index) {
            console.log(userId);
            if (element.id === userId) {
                users.splice(index, 1);
                response.writeHead(204, { 'Content-Type': 'text/json' });
                response.end();
            }
        });
        /*response.writeHead(400, {'Content-Type': 'text/json'});
        response.end('User ID invalid!');*/
    }
    if (url && (0, utils_1.checkMethod)(method, 'PUT')) {
        if (!isUuid) {
            response.writeHead(404, { 'Content-Type': 'text/json' });
            response.end('User ID invalid!');
        }
        else {
            request.on('data', function (chunk) {
                body += chunk.toString();
            });
            request.on('end', function () {
                users.forEach(function (element) {
                    if (element.id === userId) {
                        Object.assign(element, JSON.parse(body));
                        response.writeHead(200, { 'Content-Type': 'text/json' });
                        response.end();
                    }
                });
                /*response.writeHead(400, {'Content-Type': 'text/json'});
                response.end('This user doesn\'t exists!');*/
            });
        }
    }
    if (request.url === '/api/user' && (0, utils_1.checkMethod)(method, 'POST')) {
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
                response.writeHead(201, { 'Content-Type': 'text/json' });
                response.end();
            }
            catch (error) {
                console.log(error);
                response.writeHead(400, { 'Content-Type': 'text/json' });
                response.end('No contains required fields');
            }
        });
    }
    else if (request.url === '/api/users' && (0, utils_1.checkMethod)(method, 'GET')) {
        response.writeHead(200, { 'Content-Type': 'text/json' });
        if (users.length > 0) {
            response.write(JSON.stringify(users));
        }
        response.end();
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('Error: invalid endpoint!');
    }
}).listen(port, function () { return console.log("Server started, port: ".concat(port)); });
