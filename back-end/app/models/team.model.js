'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Event, {
        foreignKey: 'primary',
      })

      this.hasMany(models.Event, {
        foreignKey: 'secondary',
      })
    }
  }
  Team.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'teams',
  });
  return Team;
};