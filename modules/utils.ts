import { ServerResponse } from "http";

export const checkMethod = (method?: string, check?: string) => {
  if (method === check) {
    return true
  }
  return false
}

export const getServerError = (response: ServerResponse) => {
  response.writeHead(500, {'Content-Type': 'text/json'});
  response.end('Server error!');
}