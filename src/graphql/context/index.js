import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import 'dotenv/config';

import db from '../../database/models';

const verifyToken = async (token) => {
  const secret = process.env.SECRET_KEY;
  try {
    if (!token) {
      throw new AuthenticationError('Not Authorized!');
    }

    const { userId } = await jwt.verify(token, secret);
    const user = await db.User.findOne({ where: { userId } });
    return user;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

module.exports = async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || '';
  const user = await verifyToken(token);
  return { user };
};
