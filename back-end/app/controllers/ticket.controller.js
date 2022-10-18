const db = require("../models");
const Event = db.event;
const Sport = db.sport;
const Team = db.team;
const EventStatus = db.eventStatus;
const TicketStatus = db.ticketStatus;
const Ticket = db.ticket;
const User = db.user;

const TICKET_STATUS_NON_RESOLVED_ID = 1;

exports.createTicket = async (req, res) => {
  try {
    await Ticket.create({
      userId: req.body.userId,
      eventId: req.body.eventId,
      risking: req.body.risking,
      winnerId: req.body.winnerId,
      winnerType: req.body.winnerType,
      prize: req.body.prize,
      ticketStatusId: TICKET_STATUS_NON_RESOLVED_ID
    });

    const tickets = await Ticket.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Event, as: 'event', include: [
          { model: Team, as: 'primary'},
          { model: Team, as: 'secondary'},
          { model: Sport, as: 'sport' },
          { model: EventStatus, as: 'eventStatus' }
          ]
        },
        { model: Team , as: 'winner' },
        { model: TicketStatus, as: 'ticketStatus'}
      ],
      where: { userId: req.body.userId }
    });

    const events = await Event.findAll({
      include: [
        { model: Team, as: 'primary'},
        { model: Team, as: 'secondary'},
        { model: Sport, as: 'sport' },
        { model: EventStatus, as: 'eventStatus' },
        { model: Ticket }
      ]
    });

    res.json({ tickets: tickets, events: events });
  } catch (err) {
    res.status(500).send({message: ">> Error while creating Ticket " + err});
  }
}

exports.fetchAllTicket = async (req, res) => {
  const id = req.params.userId;
  
  try {
    const tickets = await Ticket.findAll({
      where: { userId: id },
      include: [
        { model: User, as: 'user' },
        { model: Event, as: 'event', include: [
          { model: Team, as: 'primary'},
          { model: Team, as: 'secondary'},
          { model: Sport, as: 'sport' },
          { model: EventStatus, as: 'eventStatus' }
          ]
        },
        { model: Team , as: 'winner' },
        { model: TicketStatus, as: 'ticketStatus'}
      ]
    });
    res.json(tickets);
  } catch (err) {
    res.status(500).send({message: ">> Error while fetching Tickets " + err});
  }
}