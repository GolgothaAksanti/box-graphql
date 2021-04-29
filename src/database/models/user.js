import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [7, 47],
        },
      },
    },
    {
      defaultScope: {
        rawAttributes: {
          exclude: ['password'],
        },
      },
    },
    {
      tableName: 'user',
    },
  );

  User.findByLogin = async (a, b) => {
    let user = await User.findOne({ where: { username: a } });

    if (!user) {
      user = await User.findOne({ where: { email: b } });
    }

    return user;
  };

  User.prototype.validatePassword = async function (password) {
    const pswd = await bcrypt.compare(password, this.password);
    return pswd;
  };

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });
  User.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    if (this.password) {
      const pswd = await bcrypt.hash(this.password, saltRounds);
      return pswd;
    }
  };

  User.associate = (models) => {
    User.hasOne(models.Message, {
      foreignKey: 'userId',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  };
  return User;
};
