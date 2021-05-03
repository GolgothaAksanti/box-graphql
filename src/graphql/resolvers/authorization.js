import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

import db from '../../database/models';

const isAuthenticated = (_, args, { user = null }) => (user ? skip : new ForbiddenError('Not authenticated as user'));

const isMessageOwner = async (parent, { messageId }, { user }) => {
  const message = await db.Message.findByPk(messageId, { raw: true });

  if (message.userId !== user.userId) {
    throw new ForbiddenError('Not authenticated as owner');
  }
};

const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { user: { role } }) => (role === 'ADMIN' ? skip : new ForbiddenError('Not authorized as admin')),
);

const auth = { isAuthenticated, isMessageOwner, isAdmin };

export default auth;
