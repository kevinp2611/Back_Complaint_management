"use strict";
const db = require("../models");
const { createPassword } = require("../services/utils");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await createPassword("admin@123", 10);
    const user = [
      {
        firstName: "kevin",
        lastName: "paghadal",
        email: "kevin@mailinatorsp.com",
        password: password,
        contactNo: "9456789045",
        address: "haveli streeet,ahemdabad",
        latitude: 23.031889577906767,
        longitude: 72.54711881085653,
        role_id: 1,
      },
    ];

    await db.sequelize.models.User.bulkCreate(user, {
      updateOnDuplicate: ["email"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
