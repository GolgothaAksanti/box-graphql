import db from '../../database/models';

module.exports = {
  Mutation: {
    async register(root, args, context) {
      const { username, email, password } = args.input;
      const res = await db.User.create({ username, email, password });
      return res;
    },
  },
};
