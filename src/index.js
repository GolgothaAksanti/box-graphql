import 'dotenv/config';

import server from './api';

const PORT = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.error(`${(new Date()).toUTCString()} uncaughtException: `, err);
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  console.error(`${(new Date()).toUTCString()} uncaughtRejection: `, err);
});

server.listen({ PORT }, () => {
  process.stdout.write(`Server ready at: http://localhost:${PORT}/graphql`);
});
