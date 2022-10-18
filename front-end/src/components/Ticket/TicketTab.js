import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EventBus from "../../common/EventBus";
import { fetchAllTickets } from "../../services/ticket.service";
import Grid from '@mui/material/Grid';
import TicketCard from "./TicketCard";
import Typography from '@mui/material/Typography';
import { 
  ALL_TICKET, 
  NONRESOVLVED_TICKET,
  WON_TICKET, 
  LOST_TICKET, 
  DRAWN_TICKET,
  TICKET_STATUS_NON_RESOLVED_ID,
  TICKET_STATUS_WON_ID,
  TICKET_STATUS_LOST_ID,
  TICKET_STATUS_DRAWN_ID
} from '../../common/Consts';

const BoardUser = ({filter}) => {
  const [tickets, setTickets] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  let ticketsType = [];
  ticketsType[ALL_TICKET] = { id: 0,  msg: 'No Event Ticket Exist.'};
  ticketsType[NONRESOVLVED_TICKET] = { id: TICKET_STATUS_NON_RESOLVED_ID,  msg: 'No Non Resolved Ticket Exist.'};
  ticketsType[WON_TICKET] = { id: TICKET_STATUS_WON_ID,  msg: 'No Won Ticket Exist.'};
  ticketsType[LOST_TICKET] = { id: TICKET_STATUS_LOST_ID,  msg: 'No Lost Tickets Exist.'};
  ticketsType[DRAWN_TICKET] = { id: TICKET_STATUS_DRAWN_ID,  msg: 'No Drawn Ticket Exist.'};

  useEffect(() => {
    fetchAllTickets(currentUser.id).then(
      (response) => {
        setTickets(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, [currentUser]);

  const TicketList = ({tickets, message}) => {
    return (
      <React.Fragment>
        {
          tickets.length > 0 ?
            tickets.map((ticket) => (
              <Grid item lg={12} md={12} sm={12} xs={12} key={ticket.id}>
                <TicketCard ticket={ticket} />
              </Grid>
            ))
          : <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h5">{message}</Typography>
          </Grid>
        }
      </React.Fragment>
    )
  }

  return (
    <Grid container spacing={1}>
      {filter === ALL_TICKET 
        ? <TicketList tickets={tickets} message={ticketsType[filter].msg} />
        : <TicketList tickets={tickets.filter(ticket => ticket.ticketStatusId === ticketsType[filter].id)} message={ticketsType[filter].msg} />
      }
    </Grid>
  );
};

export default BoardUser;
