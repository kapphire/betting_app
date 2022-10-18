const db = require("../models");
const Role = db.role;
const User = db.user;
const EventStatus = db.eventStatus;
const Sport = db.sport;
const Team = db.team;
const TicketStatus = db.ticketStatus;

const eventStatusSeeder = () => {
    EventStatus.create({
        id: 1,
        name: "Non Resolved"
    });
    
    EventStatus.create({
        id: 2,
        name: "Primary Won"
    });
    
    EventStatus.create({
        id: 3,
        name: "Secondary Won"
    });
    
    EventStatus.create({
        id: 4,
        name: "Drawn"
    });
}

module.exports = eventStatusSeeder;