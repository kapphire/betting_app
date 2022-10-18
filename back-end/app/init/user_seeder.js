const db = require("../models");
const Role = db.role;
const User = db.user;
const EventStatus = db.eventStatus;
const Sport = db.sport;
const Team = db.team;
const TicketStatus = db.ticketStatus;
const bcrypt = require("bcryptjs");

const adminSeeder = () => {
    const admin = User.create({
        id: 1,
        username: 'Admin',
        email: 'admin@betting.com',
        password: bcrypt.hashSync('Admin', 8),
        balance: 1000
    }).then(user => user.setRoles([2]));
}

module.exports = adminSeeder;