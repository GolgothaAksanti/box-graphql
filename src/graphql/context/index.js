import JWT from '../../helpers/tokenUtils';

module.exports = async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || '';
  const user = await JWT.verifyToken(token);
  return { user };
};
