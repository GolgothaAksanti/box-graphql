import server, { onPort } from './api';

server.listen({ port: onPort }, () => {
  process.stdout.write(`Server ready at: http://localhost:${onPort}/api/v1`);
});
