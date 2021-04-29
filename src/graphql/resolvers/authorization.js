import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

const isAuthenticated = (parent, args, { user = null }) => (user ? skip : new ForbiddenError('Not authenticated as user'));

export default isAuthenticated;
