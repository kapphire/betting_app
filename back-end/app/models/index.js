const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.eventStatus = require("../models/event_status.model.js")(sequelize, Sequelize);
db.team = require("../models/team.model.js")(sequelize, Sequelize);
db.sport = require("../models/sport.model.js")(sequelize, Sequelize);
db.event = require("../models/event.model.js")(sequelize, Sequelize);
db.ticketStatus = require("../models/ticket_status.model.js")(sequelize, Sequelize);
db.ticket = require("../models/ticket.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//Event relation.
db.event.belongsTo(db.sport, {
  foreignKey: "sportId",
  as: "sport"
});
db.sport.hasMany(db.event);

db.event.belongsTo(db.team, {
  foreignKey: "primaryId",
  as: "primary"
});
db.event.belongsTo(db.team, {
  foreignKey: "secondaryId",
  as: "secondary"
});
db.team.hasMany(db.event);

db.event.belongsTo(db.eventStatus, {
  foreignKey: "eventStatusId",
  as: "eventStatus"
});
db.eventStatus.hasMany(db.event, { onDelete: 'cascade' });

//Ticket relation.
db.ticket.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
});
db.user.hasMany(db.ticket);

db.ticket.belongsTo(db.event, {
  foreignKey: "eventId",
  as: "event"
})
db.event.hasMany(db.ticket);

db.ticket.belongsTo(db.team, {
  foreignKey: "winnerId",
  as: "winner"
});
db.team.hasMany(db.ticket);

db.ticket.belongsTo(db.ticketStatus, {
  foreignKey: "ticketStatusId",
  as: "ticketStatus"
});
db.ticketStatus.hasMany(db.ticket);

db.ROLES = ["user", "admin"];

module.exports = db;
