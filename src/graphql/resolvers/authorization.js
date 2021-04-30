import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

const isAuthenticated = (_, args, { user = null }) => (user ? skip : new ForbiddenError('Not authenticated as user'));

const auth = { isAuthenticated };

export default auth;
