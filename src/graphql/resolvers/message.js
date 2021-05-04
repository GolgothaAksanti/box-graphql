/* eslint-disable no-unused-vars */
import { AuthenticationError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';

import auth from './authorization';
import db from '../../database/models';
import pubSub, { EVENTS } from '../../subscription';
import cursorHash from '../../helpers/utils/hashCursor';

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

        const message = await db.Message.create({
          userId: user.userId,
          text,
        });

        pubSub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: { message },
        });

        return message;
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
     * @param {*} _
     * @param {*} content
     * @returns {Object} message object with array inside
     */
    getAllMessages: async (_, { cursor, limit }, content) => {
      const cursorOptions = cursor
        ? {
          where: {
            createdAt: {
              [Op.lt]: cursorHash.fromCursorHash(cursor),
            },
          },
        }
        : {};

      const messages = await db.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });

      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;

      const res = {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: cursorHash.toCursorHash(edges[edges.length - 1].createdAt),
        },
      };

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

  Subscription: {
    messageCreated: {
      subscribe: () => pubSub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
};
