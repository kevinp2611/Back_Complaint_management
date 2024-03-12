"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Complaints extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Complaints.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
          as: "user_id",
        },
      },
      department_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Department",
          key: "id",
          as: "department_id",
        },
      },
      query_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Query",
          key: "id",
          as: "query_id",
        },
      },
      otherQueryText: { type: DataTypes.STRING, allowNull: true },
      computerNo: { type: DataTypes.STRING, allowNull: true },
      note: { type: DataTypes.TEXT, allowNull: true },
      status: {
        type: DataTypes.ENUM("PANDING", "PROCESSING", "SOLVED"),
        defaultValue: "PANDING",
      },
      image: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: "Complaints",
    }
  );
  return Complaints;
};
