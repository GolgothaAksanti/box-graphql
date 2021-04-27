export default {
  Query: {
    messages: async (parent, args, { models }) => {
      const res = await models.Message.findAll();
      return res;
    },
    message: async (parent, { id }, { models }) => {
      const res = await models.Message.findById(id);
      return res;
    },
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      const res = await models.Message.create({
        text,
        userid: me.id,
      });
      return res;
    },

    deleteMessage: async (parent, { id }, { models }) => {
      const res = await models.Message.destroy({
        where: {
          id,
        },
      });
      return res;
    },
  },

  Message: {
    user: async (message, args, { models }) => {
      const res = await models.User.findByPk(message.userId);
      return res;
    },
  },
};
