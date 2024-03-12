"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoleHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoleHasPermission.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
          as: "role_id",
        },
      },
      permission_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Permissions",
          key: "id",
          as: "permission_id",
        },
      },
    },
    {
      sequelize,
      modelName: "RoleHasPermission",
    }
  );
  return RoleHasPermission;
};
