/* eslint-disable no-unused-vars */
import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';

import db from '../../database/models';
import JWT from '../../helpers/utils/tokenUtils';
import auth from './authorization';

module.exports = {
  Mutation: {
    register: async (root, args, context) => {
      const {
        username, email, password, role
      } = args.input;

      const login = username || email;

      const isExist = await db.User.findByLogin(login);

      if (isExist) {
        throw new AuthenticationError('user already exists');
      }

      const user = await db.User.create({
        username,
        email,
        password,
        role,
      });

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

    getAllUsers: combineResolvers(auth.isAdmin, async (root, args, content) => {
      const res = await db.User.findAll();
      return res;
    }),

    // deleteUser: combineResolvers(auth.IsAdmin, async (parent, { userId }) => {
    //   const res = await db.User.destroy({ where: { userId } });

    //   return res;
    // }),
  },
};
