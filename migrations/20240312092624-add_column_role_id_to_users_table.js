"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "role_id", {
      type: Sequelize.INTEGER,
      after: "isVarified",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: "Roles",
        key: "id",
        as: "role_id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Users",
      "Users_role_id_foreign_idx",
      {}
    );
    await queryInterface.removeColumn("Users", "role_id");
  },
};
