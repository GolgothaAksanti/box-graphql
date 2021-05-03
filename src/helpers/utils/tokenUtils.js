import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AuthenticationError } from 'apollo-server-express';

import db from '../../database/models';

const createToken = async (user, expiresIn) => {
  const secret = process.env.SECRET_KEY;

  const {
    userId, email, username, role
  } = user;

  const res = await jwt.sign(
    {
      userId,
      email,
      username,
      role,
    },
    secret,
    {
      expiresIn,
    },
  );
  return res;
};

const verifyToken = async (token) => {
  const secret = process.env.SECRET_KEY;
  try {
    if (!token) return null;

    const { userId } = await jwt.verify(token, secret);
    const user = await db.User.findOne({ where: { userId } });
    return user;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

const JWT = { createToken, verifyToken };

export default JWT;
