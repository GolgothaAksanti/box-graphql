import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

import db from '../../database/models';

const isAuthenticated = (_, args, { user = null }) => (user ? skip : new ForbiddenError('Not authenticated as user'));

const isMessageOwner = async (_, args, { messageId }, { user }) => {
  const message = await db.Message.findOne({ where: { messageId } });

  if (message.userId !== user.userId) {
    throw new ForbiddenError('Not authenticated as owner');
  }

  return skip;
};

const auth = { isAuthenticated, isMessageOwner };

export default auth;
