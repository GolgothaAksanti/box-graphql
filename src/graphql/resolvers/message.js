/* eslint-disable no-unused-vars */
import { AuthenticationError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';

import auth from './authorization';
import db from '../../database/models';

module.exports = {
  Mutation: {
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

    deleteMessage: combineResolvers(
      auth.isAuthenticated,
      async (parent, { messageId }, { user = null }) => {
        const message = await db.Message.findOne({ where: { messageId } });

        if (message.userId !== user.userId) {
          throw new AuthenticationError('Not authenticated as owner');
        }

        const res = await db.Message.destroy({ where: { messageId } });
        return res;
      },
    ),
  },

  Query: {
    getAllMessages: async (root, args, content) => {
      const res = await db.Message.findAll();
      return res;
    },

    getSingleMessage: combineResolvers(
      auth.isAuthenticated,
      async (_, { messageId }, { user = null }, content) => {
        const res = await db.Message.findOne({ where: { messageId } });

        return res;
      },
    ),
  },
};
