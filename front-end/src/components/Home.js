import React, { useState, useEffect } from "react";

import EventBus from "../common/EventBus";
import { getBasicData } from "../services/event.service";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EventCard from "./Event/EventCard";
import { 
  EVENT_STATUS_NON_RESOLVED_ID
} from '../common/Consts';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getBasicData().then(
      (response) => {
        setEvents(response.data.event);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <Grid container spacing={1}>
          {events.filter(event => event.eventStatusId === EVENT_STATUS_NON_RESOLVED_ID).length === 0 &&
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h5">No Active Event Exist!</Typography>
            </Grid>
          }
          {events.map((event) => (
            event.eventStatusId === EVENT_STATUS_NON_RESOLVED_ID && // When event is open to bet.
            <Grid item lg={12} md={12} sm={12} xs={12} key={event.id}>
              <EventCard event={event} isAdmin={false} setEvents={setEvents} eventStatus={event.eventStatus}/>
            </Grid>
          ))}
        </Grid>
      </header>
    </div>
  );
};

export default Home;
