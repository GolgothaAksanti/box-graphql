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
        allowNull: false,
      },
    },
    {
      tableName: 'Message',
    },
  );

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
  };

  return Message;
};
