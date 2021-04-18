'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Apartment.belongsTo(models.User, {
        foreignKey: 'realtorId',
        as: 'realtor',
        onDelete: 'cascade',
      });
    }
  }
  Apartment.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 3,
            msg: 'Name must be at least 3 characters in length',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: 10,
            msg: 'Description must be at least 10 characters in length',
          },
        },
      },
      floorAreaSize: DataTypes.FLOAT,
      pricePerMonth: DataTypes.FLOAT,

      numberOfRooms: DataTypes.INTEGER,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      address: DataTypes.STRING,
      rented: DataTypes.BOOLEAN,
      realtorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Apartment',
    },
  );
  return Apartment;
};
