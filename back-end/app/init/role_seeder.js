const db = require("../models");
const Role = db.role;
const User = db.user;
const EventStatus = db.eventStatus;
const Sport = db.sport;
const Team = db.team;
const TicketStatus = db.ticketStatus;

const roleSeeder = () => {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "admin"
    });
}

module.exports = roleSeeder;