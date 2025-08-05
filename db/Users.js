const Sequelize = require("sequelize");
const Users = this.Users;

module.exports = function (sequelize) {
  return sequelize.define(
    "Users",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      removed: {
        type: Sequelize.BOOLEAN(),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "users",
    }
  );
};