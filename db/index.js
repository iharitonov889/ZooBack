const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.API_DB_NAME,
  process.env.API_DB_USER,
  process.env.API_DB_PASSWORD,
  {
    dialect: process.env.API_DB_DIALECT,
    host: process.env.API_DB_HOST,
    logging: false,
    port: process.env.API_DB_PORT,
  }
);

const Users = require("./Users")(sequelize);
const Animals = require("./Animals")(sequelize);
const AnimalCards = require("./AnimalCards")(sequelize);

Animals.hasMany(AnimalCards, { foreignKey: "animal", sourceKey: "id" });
AnimalCards.belongsTo(Animals, { foreignKey: "animal", targetKey: "id" });

module.exports = {
  sequelize: sequelize,
  users: Users,
  animals: Animals,
  animalCards: AnimalCards,
};
