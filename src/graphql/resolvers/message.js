/* eslint-disable no-unused-vars */
import { AuthenticationError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';

import auth from './authorization';
import db from '../../database/models';

module.exports = {
  Mutation: {
    /**
     * createmessage
     * @author Golgotha Aksanti
     * @since 1.0.0
     *
     * @param {*} _
     * @param {*} text
     * @param {*} user
     * @returns {Promise}
     */
    createMessage: combineResolvers(
      auth.isAuthenticated,
      async (_, { text }, { user = null }) => {
        const isExist = await db.Message.findByText(text);

        if (isExist) {
          throw new AuthenticationError('Already Exist');
        }

        const res = await db.Message.create({
          userId: user.userId,
          text,
        });

        return res;
      },
    ),

    /**
     * deleteMessage
     * @author Golgotha Aksanti
     * @since 1.0.0
     *
     * @param {*} parent
     * @param {*} messageId
     * @param {*} user
     * @returns {boolean}
     */
    deleteMessage: combineResolvers(
      auth.isAuthenticated,
      auth.isMessageOwner,
      async (parent, { messageId }, { user = null }) => {
        const res = await db.Message.destroy({ where: { messageId } });

        return res;
      },
    ),
  },

  Query: {
    /**
     *
     * @param {*} root
     * @param {*} args
     * @param {*} content
     * @returns {Object} message object with array inside
     */
    getAllMessages: async (root, args, content) => {
      const res = await db.Message.findAll();
      return res;
    },

    /**
     * getSingleMessage
     * @author Golgotha Aksanti
     * @since 1.0.0
     *
     * @param {*} messageId
     * @param {*} user
     * @param {*} content
     * @returns {Object} message object
     */
    getSingleMessage: combineResolvers(
      auth.isAuthenticated,
      async (_, { messageId }, { user = null }, content) => {
        const res = await db.Message.findOne({ where: { messageId } });

        return res;
      },
    ),
  },
};
