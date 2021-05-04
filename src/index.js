import httpServer, { onPort } from './api';

httpServer.listen({ port: onPort }, () => {
  process.stdout.write(`Server ready at: http://localhost:${onPort}/api/v1`);
});
