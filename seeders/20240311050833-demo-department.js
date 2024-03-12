"use strict";
const db = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const departments = [
      { name: "Information Technology", slug: "information-technology" },
      { name: "Computer Department", slug: "computer-department" },
      { name: "Mechanical Department", slug: "mechanical-department" },
      { name: "Civil Department", slug: "civil-department" },
      { name: "FPT Department", slug: "fpt-department" },
      { name: "Chemical Department", slug: "chemical-department" },
    ];

    await db.sequelize.models.Department.bulkCreate(departments, {
      updateOnDuplicate: ["slug", "name"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Departments", null, {});
  },
};
