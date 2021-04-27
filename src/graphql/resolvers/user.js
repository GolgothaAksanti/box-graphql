export default {
  Query: {
    users: async (parent, args, { models }) => {
      const res = await models.User.findAll();
      return res;
    },
    user: async (parent, { id }, { models }) => {
      const res = await models.User.findByPk(id);
      return res;
    },
    me: async (parent, args, { models, me }) => {
      const res = await models.User.findByPk(me.id);
      return res;
    },
  },

  User: {
    messages: async (user, args, { models }) => {
      const res = await models.Message.findAll({
        where: {
          userId: user.id,
        },
      });
      return res;
    },
  },
};
