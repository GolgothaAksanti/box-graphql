/* eslint-disable no-unused-vars */
import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';

import db from '../../database/models';
import JWT from '../../helpers/utils/tokenUtils';
import auth from './authorization';

module.exports = {
  Mutation: {
    /**
     * register a new user
     * @author Golgotha Aksanti
     * @since 1.0.0
     *
     * @param {*} root
     * @param {*} args
     * @param {*} context
     * @returns {token}
     */

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

    /**
     * login
     * @author Golgotha Aksanti
     * @since 1.0.0
     *
     * @param {*} root
     * @param {*} input
     * @param {*} content
     * @returns {token}
     */

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

    /**
     * getAllUsers
     * @author Golgotha Aksanti
     * @since 1.0.0
     *
     * @param {*} root
     * @param {*} args
     * @param {*} content
     * @returns {object} object with users array
     */

    getAllUsers: combineResolvers(auth.isAdmin, async (root, args, content) => {
      const res = await db.User.findAll();
      return res;
    }),

    /**
     * getSingleUser
     * @author Golgotha Aksanti
     * @since 1.0.0
     *
     * @param {*} root
     * @param {*} {userId}
     * @param {*} content
     * @returns {Promise} user object
     */

    getSingleUser: combineResolvers(
      auth.isAdmin,
      async (root, { userId }, content) => {
        const res = await db.User.findOne({ where: { userId } });

        return res;
      },
    ),

    /**
     * deleteUser
     * @author Golgotha Aksanti
     * @since 1.0.0
     *
     * @param {*} parent
     * @param {*} userId
     * @param {*} user
     * @param {*} content
     * @returns {Boolean}
     */

    deleteUser: combineResolvers(
      auth.isAdmin,
      async (parent, { userId }, { user = null }, content) => {
        const res = await db.User.destroy({ where: { userId } });

        return res;
      },
    ),
  },
};
