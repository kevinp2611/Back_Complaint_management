"use strict";
const db = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await db.sequelize.transaction();
    const roles = [
      { name: "Admin", slug: "admin" },
      { name: "Maitenance", slug: "maitenance" },
      { name: "Faculty", slug: "faculty" },
      { name: "User", slug: "user" },
    ];
    const permission = [
      { name: "user/add", slug: "user-add" },
      { name: "user/delete", slug: "user-delete" },
      { name: "user/list", slug: "user-list" },
      { name: "complaint/list", slug: "complaint-list" },
    ];

    try {
      await db.sequelize.models.Role.bulkCreate(roles, {
        updateOnDuplicate: ["slug", "name"],
        transaction: t,
      });
      await db.sequelize.models.Permission.bulkCreate(permission, {
        updateOnDuplicate: ["slug", "name"],
        transaction: t,
      });

      const Role_id = await db.sequelize.models.Role.findOne({
        attributes: ["id"],
      });
      const Permissin_id = await db.sequelize.models.Permission.findAll({
        attributes: ["id"],
      });

      // let array = []
      // await Promise.all(
      //   Permissin_id.map(async (data) => {
      //     array.push({
      //       role_id: Role_id.id,
      //       permission_id: data.id,
      //     });
      //   })
      // );

      // console.log(array);
      // .then((array) => {
      //   db.sequelize.models.RoleHasPermission.bulkCreate(array, {
      //     transaction: t,
      //   });
      // });

      const RolehaspermissinData = await Data();
      function Data() {
        const array = [];
        Promise.all(
          Permissin_id.map(async (data) => {
            array.push({
              role_id: Role_id.id,
              permission_id: data.id,
            });
          })
        );

        return array;
      }
     console.log("hii", RolehaspermissinData);
      // const RolehaspermissinData =await  Data();
      // console.log(RolehaspermissinData);
      // await db.sequelize.models.RoleHasPermission.bulkCreate(
      //   RolehaspermissinData,
      //   { transaction: t }
      // );
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
