export default {
  Query: {
    users: (parent, args, { models }) => Object.values(models.users),
    user: (parent, { id }, { models }) => models.users[id],
    me: (parent, args, { me }) => me,
  },

  User: {
    messages: (user, args, { models }) => Object.values(models.messages).filter(
      (messages) => message.userId === user.id,
    ),
  },
};
