import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';

import db from '../../database/models';

const createToken = async (user, expiresIn) => {
  const secret = process.env.SECRET_KEY;

  const { userId, email, username } = user;

  const res = await jwt.sign({ userId, email, username }, secret, {
    expiresIn,
  });
  return res;
};

module.exports = {
  Mutation: {
    register: async (root, args, context) => {
      const { username, email, password } = args.input;

      const isExist = await db.User.findByLogin(username, email);

      if (isExist) {
        throw new AuthenticationError('user already exists');
      }

      const user = await db.User.create({ username, email, password });

      const token = await createToken(user, '24h');

      return { ...user.toJSON(), token };
    },

    login: async (root, { input }, content) => {
      const { email, username, password } = input;

      const user = await db.User.findByLogin(username, email);

      if (!user) {
        throw new UserInputError('No User found with this login credentials');
      }

      const isValidPswd = await user.validatePassword(password);

      if (!isValidPswd) {
        throw new AuthenticationError('invalid Password');
      }

      const token = await createToken(user, '24h');
      return { ...user.toJSON(), token };
    },
  },
};
