import React, { useState, useEffect } from "react";

import { getBasicData } from "../../services/event.service";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EventBus from "../../common/EventBus";
import AddEvent from "./AddEvent";
import EventCard from "./EventCard";
import { 
  IN_PROGRESS_EVENT, 
  RESOLVED_EVENT,
  EVENT_STATUS_NON_RESOLVED_ID
} from '../../common/Consts';

const EventTab = ({filter}) => {
  const [teams, setTeams] = useState([]);
  const [sports, setSports] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventStatus, setEventStatus] = useState([]);
  useEffect(() => {
    getBasicData().then(
      (response) => {
        setTeams(response.data.team);
        setSports(response.data.sport);
        setEvents(response.data.event);
        setEventStatus(response.data.eventStatus);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <Grid container spacing={1}>
      {filter === IN_PROGRESS_EVENT && <Grid item lg={12} md={12} sm={12} xs={12}>
        <AddEvent teams={teams} sports={sports} setEvents={setEvents} />
      </Grid>}
      {filter === IN_PROGRESS_EVENT && 
        <React.Fragment>
          {
            events.filter(event => event.eventStatusId === EVENT_STATUS_NON_RESOLVED_ID).length > 0 ?
              events.filter(event => event.eventStatusId === EVENT_STATUS_NON_RESOLVED_ID).map((event) => (
                <Grid item lg={12} md={12} sm={12} xs={12} key={event.id}>
                  <EventCard event={event} eventStatus={eventStatus} setEvents={setEvents} isAdmin />
                </Grid>
              ))
            : <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h5">No In Progress Events</Typography>
            </Grid>
          }
        </React.Fragment>
      }

      {filter === RESOLVED_EVENT && 
        <React.Fragment>
          {
            events.filter(event => event.eventStatusId !== EVENT_STATUS_NON_RESOLVED_ID).length > 0 ?
              events.filter(event => event.eventStatusId !== EVENT_STATUS_NON_RESOLVED_ID).map((event) => (
                <Grid item lg={12} md={12} sm={12} xs={12} key={event.id}>
                  <EventCard event={event} eventStatus={eventStatus} setEvents={setEvents} isAdmin />
                </Grid>
              ))
            : <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h5">No Resolved Events</Typography>
            </Grid>
          }
        </React.Fragment>
      }
    </Grid>
  );
};

export default EventTab;
