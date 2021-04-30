/* eslint-disable no-unused-vars */
import { AuthenticationError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';

import isAuthenticated from './authorization';
import db from '../../database/models';

module.exports = {
  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
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
  },

  Query: {
    getAllMessages: async (root, args, content) => {
      const res = await db.Message.findAll();
      return res;
    },

    // getSingleMessage: async (_, { messageId }, content) => {
    //   const res = await db.Message.findOne({ where: { messageId } });
    //   return res;
    // },
  },

  // Message: {
  //   author(message) {
  //     return message.userId;
  //   },
  // },
};
