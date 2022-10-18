const db = require("../models");
const Role = db.role;
const User = db.user;
const EventStatus = db.eventStatus;
const Sport = db.sport;
const Team = db.team;
const TicketStatus = db.ticketStatus;

const ticketStatusSeeder = () => {
    TicketStatus.create({
        id: 1,
        name: "Non Resolved"
    });
    
    TicketStatus.create({
        id: 2,
        name: "Won"
    });
    
    TicketStatus.create({
        id: 3,
        name: "Lost"
    });
    
    TicketStatus.create({
        id: 4,
        name: "Drawn"
    });
}

module.exports = ticketStatusSeeder;