module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define(
    'Message',
    {
      messageId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      text: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      freezeTableName: true,
      tableName: 'Messages',
    },
  );

  Message.findByText = async (text) => {
    const message = await Message.findOne({ where: { text } });
    return message;
  };

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Message;
};
