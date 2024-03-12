"use strict";
const db = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const queries = [
      { name: "Computer", slug: "computer" },
      { name: "Plumbing", slug: "plumbing" },
      { name: "Carpenting", slug: "carpenting" },
      { name: "Electric", slug: "electric" },
    ];

    await db.sequelize.models.Query.bulkCreate(queries, {
      updateOnDuplicate: ["slug", "name"],
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Queries", null, {});
  },
};
