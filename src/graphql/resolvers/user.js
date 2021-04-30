/* eslint-disable no-unused-vars */
import { AuthenticationError, UserInputError } from 'apollo-server';

import db from '../../database/models';
import JWT from '../../helpers/tokenUtils';

module.exports = {
  Mutation: {
    register: async (root, args, context) => {
      const { username, email, password } = args.input;

      const isExist = await db.User.findByLogin(username, email);

      if (isExist) {
        throw new AuthenticationError('user already exists');
      }

      const user = await db.User.create({ username, email, password });

      const token = await JWT.createToken(user, '24h');

      return { ...user.toJSON(), token };
    },

    login: async (root, { input }, content) => {
      const { login, password } = input;

      const user = await db.User.findByLogin(login);

      if (!user) {
        throw new UserInputError('No User found with this login credentials');
      }

      const isValidPswd = await user.validatePassword(password);

      if (!isValidPswd) {
        throw new AuthenticationError('invalid Password');
      }

      const token = await JWT.createToken(user, '24h');
      return { ...user.toJSON(), token };
    },
  },
};
