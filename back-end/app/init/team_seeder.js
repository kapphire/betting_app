const db = require("../models");
const Role = db.role;
const User = db.user;
const EventStatus = db.eventStatus;
const Sport = db.sport;
const Team = db.team;
const TicketStatus = db.ticketStatus;

const teamSeeder = () => {
    Team.create({
        id: 1,
        name: 'Manchester'
    });
    
    Team.create({
        id: 2,
        name: 'Madrid'
    });
    
    Team.create({
        id: 3,
        name: 'Munich'
    });
    
    Team.create({
        id: 4,
        name: 'Arsenal'
    });
    
    Team.create({
        id: 5,
        name: 'Dortmund'
    });
    
    Team.create({
        id: 6,
        name: 'ParisSG'
    });
}

module.exports = teamSeeder;