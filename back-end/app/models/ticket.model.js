'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })

      this.belongsTo(models.Event, {
        foreignKey: 'eventId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })

      this.belongsTo(models.TicketStatus, {
        foreignKey: 'ticketStatus',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    }
  }
  Ticket.init({
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    risking: DataTypes.INTEGER,
    winnerId: DataTypes.INTEGER,
    winnerType: DataTypes.BOOLEAN,
    prize: DataTypes.FLOAT,
    ticketStatusId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'tickets',
  });
  return Ticket;
};