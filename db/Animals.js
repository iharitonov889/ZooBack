const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define("Animals", {
      id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull: false
      },
      kind_of_animal : {
        type : Sequelize.STRING(30),
        allowNull: false
      },
      description : {
        type : Sequelize.STRING(60),
        allowNull: false
      },
      removed : {
        type : Sequelize.BOOLEAN,
        allowNull: false
      },
    }, {
        timestamps: false,
        tableName: 'animals'
    });
};




