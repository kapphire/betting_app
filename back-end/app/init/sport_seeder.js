const db = require("../models");
const Role = db.role;
const User = db.user;
const EventStatus = db.eventStatus;
const Sport = db.sport;
const Team = db.team;
const TicketStatus = db.ticketStatus;

const sportSeeder = () => {
    Sport.create({
        id: 1,
        name: 'Football'
    });
    
    Sport.create({
        id: 2,
        name: 'Tennis'
    });
}

module.exports = sportSeeder;