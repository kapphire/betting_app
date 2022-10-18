const roleSeeder = require("./role_seeder.js");
const userSeeder = require("./user_seeder.js");
const teamSeeder = require("./team_seeder.js");
const sportSeeder = require("./sport_seeder.js");
const eventStatusSeeder = require("./event_status_seeder.js");
const ticketStatusSeeder = require("./ticket_status_seeder.js");

const initial = () => {
    roleSeeder();
    userSeeder(); 
    teamSeeder(); 
    sportSeeder(); 
    eventStatusSeeder(); 
    ticketStatusSeeder(); 
}

module.exports = initial;