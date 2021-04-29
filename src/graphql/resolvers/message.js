import { AuthenticationError } from 'apollo-server-express';

import db from '../../database/models';

module.exports = {
  Mutation: {
    createMessage: async (_, { text }, { user = null }) => {
      if (!user) {
        throw new AuthenticationError('you must login to create a post');
      }

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
  },
};
