const Sequelize = require("sequelize");
const AnimalCards = this.AnimalCards;

module.exports = function (sequelize) {
  return sequelize.define(
    "AnimalCards",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      aviary_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      animal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      moniker: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      food: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      removed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "animal_cards",
    }
  );
};
