import JWT from '../../helpers/utils/tokenUtils';

module.exports = async ({ req, connection }) => {
  if (connection) {
    process.stdout.write(connection);
  }

  if (req) {
    const token = (req.headers && req.headers.authorization) || '';
    const user = await JWT.verifyToken(token);
    return { user };
  }
};
