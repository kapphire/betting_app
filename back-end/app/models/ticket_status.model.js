module.exports = (sequelize, Sequelize) => {
    const TicketStatus = sequelize.define("ticket_status", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return TicketStatus;
  };
  