'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Team, {
        foreignKey: 'primaryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })

      this.belongsTo(models.Team, {
        foreignKey: 'secondaryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })

      this.belongsTo(models.Sport, {
        foreignKey: 'sportId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })

      this.belongsTo(models.EventStatus, {
        foreignKey: 'eventStatusId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    }
  }
  Event.init({
    primaryId: DataTypes.INTEGER,
    secondaryId: DataTypes.INTEGER,
    sportId: DataTypes.INTEGER,
    eventStatusId: DataTypes.INTEGER,
    odds: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'events',
  });
  return Event;
};