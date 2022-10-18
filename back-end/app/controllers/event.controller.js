const db = require("../models");
const Sequelize = require("sequelize");
const Event = db.event;
const Sport = db.sport;
const Team = db.team;
const EventStatus = db.eventStatus;
const Ticket = db.ticket;
const User = db.user;
const sequelize = db.sequelize;

const EVENT_STATUS_NON_RESOLVED_ID = 1;
const EVENT_STATUS_PRIMARY_WON_ID = 2;
const EVENT_STATUS_SECONDARY_WON_ID = 3;

const TICKET_STATUS_WON_ID = 2;
const TICKET_STATUS_LOST_ID = 3;
const TICKET_STATUS_DRAWN_ID = 4;

const SPORT_FOOTBALL_ID = 1;

exports.fetchAllBasicData = async (req, res) => {
  
  try {
    const sports = await Sport.findAll();
    const teams = await Team.findAll();
    const eventStatus = await EventStatus.findAll();
    const events = await Event.findAll({
      include: [
        { model: Team, as: 'primary'},
        { model: Team, as: 'secondary'},
        { model: Sport, as: 'sport' },
        { model: EventStatus, as: 'eventStatus' },
        { model: Ticket }
      ]
    });

    let result = {};
    result['event'] = events;
    result['sport'] = sports;
    result['team'] = teams;
    result['eventStatus'] = eventStatus;
    res.json(result);
  } catch (err) {
    res.status(500).send({
      message: ">> Error while getting basic data: " + err
    });
  }
}

exports.createEvent = async (req, res) => {
  try {
    await Event.create({
      primaryId: req.body.primary,
      secondaryId: req.body.secondary,
      sportId: req.body.sportsType,
      eventStatusId: EVENT_STATUS_NON_RESOLVED_ID, //Default value is Non resolved
      odds: req.body.odds
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
    res.json(events);
  } catch (err) {
    res.status(500).send({message: ">> Error while creating Event " + err});
  }
}

const resolveEventById = async (id, body) => {
  await Event.update(
    body,
    {
      where: { id: id },
      returning: true,
      plain: true,
    },
  );
  const event = await Event.findOne({where: {id: id}});

  let winnerId = 0;
  if(body.eventStatusId === EVENT_STATUS_PRIMARY_WON_ID) winnerId = event.primaryId;
  else if(body.eventStatusId === EVENT_STATUS_SECONDARY_WON_ID) winnerId = event.secondaryId;

  if (winnerId === 0) {
    await Ticket.update(
      {
        ticketStatusId: TICKET_STATUS_DRAWN_ID
      },
      {
        where: { eventId: id },
        returning: true,
      }
    );
  }
  else {
    await sequelize.query(`
      UPDATE tickets SET ticketStatusId = CASE
        WHEN winnerId = ${winnerId} THEN 2
        ELSE 3
        END
      WHERE eventId = ${id}
    `, { })
  }

  const tickets = await Ticket.findAll({where: { eventId: id }});

  for(let i=0; i<tickets.length; i++) {
    await User.update({
      balance: tickets[i].ticketStatusId === TICKET_STATUS_WON_ID 
        ? Sequelize.literal(`balance + ${tickets[i].prize}`) 
        : ( tickets[i].ticketStatusId === TICKET_STATUS_LOST_ID 
          ? Sequelize.literal(`balance - ${tickets[i].risking}`)
          : Sequelize.literal('balance'))
      },
      {
        where : { id : tickets[i].userId }
      }
    );
  }
}

const randomResolveStatus = async (limit) => {
  return Math.floor(Math.random() * limit) + 2;
}

exports.resolveEvent = async (req, res) => {
  const id = req.params.eventId;
  
  try {
    await resolveEventById(id, req.body);
    const events = await Event.findAll({
      include: [
        { model: Team, as: 'primary'},
        { model: Team, as: 'secondary'},
        { model: Sport, as: 'sport' },
        { model: EventStatus, as: 'eventStatus' },
        { model: Ticket }
      ]
    });
    res.send(events);
  } catch (err) {
    res.status(500).send({message: ">> Error while updating Event " + err});
  }
}

exports.resolveAllEvents = async (req, res) => {
  try {
    const notResolvedEvents = await Event.findAll({
      where: { eventStatusId: EVENT_STATUS_NON_RESOLVED_ID }
    });
    
    for(let i=0; i<notResolvedEvents.length; i++) {
      let updateBody = {};
      let updateStatus = EVENT_STATUS_NON_RESOLVED_ID;

      if(notResolvedEvents[i].sportId === SPORT_FOOTBALL_ID) updateStatus = await randomResolveStatus(3);
      else updateStatus = await randomResolveStatus(2);

      updateBody = { eventStatusId: updateStatus };

      await resolveEventById(notResolvedEvents[i].id, updateBody);
    }
    
    const events = await Event.findAll({
      include: [
        { model: Team, as: 'primary'},
        { model: Team, as: 'secondary'},
        { model: Sport, as: 'sport' },
        { model: EventStatus, as: 'eventStatus' }
      ]
    });
    res.send(events);
  } catch (err) {
    res.status(500).send({message: ">> Error while updating Event " + err});
  }
}