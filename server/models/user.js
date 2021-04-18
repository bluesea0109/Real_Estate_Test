'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: 3,
            msg: 'Name must be at least 3 characters in length',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 128],
            msg: 'Email address must be between 6 and 128 characters in length',
          },
          isEmail: {
            msg: 'Email address must be valid',
          },
        },
        unique: {
          args: true,
          msg: 'Email is already in use!',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 8,
          },
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ['admin', 'realtor', 'client'],
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  return User;
};
