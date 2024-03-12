"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Faculty.init(
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
    },
    {
      sequelize,
      modelName: "Faculty",
    }
  );
  return Faculty;
};
