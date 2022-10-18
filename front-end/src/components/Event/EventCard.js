import * as React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from 'tss-react/mui';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResolveModal from './ResolveModal';
import AddTicket from '../Ticket/AddTicket';
import ShowTicket from '../Ticket/ShowTicket';
import TennisAvatar from '../../assets/img/tennis.png';
import FootballAvatar from '../../assets/img/football.png';
import { 
  SPORT_FOOTBALL_ID,
  EVENT_STATUS_NON_RESOLVED_ID
} from "../../common/Consts";

const useStyles = makeStyles()(theme => ({
	avatar: {
    width: 50,
  },
}));

export default function EventCard(props) {
  const { classes } = useStyles();
  const { event, eventStatus, setEvents, isAdmin } = props;
  const { user: currentUser } = useSelector((state) => state.auth);
  const userTicket = event.tickets.find(obj => {
    return obj.userId === currentUser.id
  });

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography  variant="h6" color="text.secondary">
          {event.sport.name} - Event Card {event.sport.id === SPORT_FOOTBALL_ID 
            ? <img src={FootballAvatar} alt="" className={classes.avatar} /> 
            : <img src={TennisAvatar} alt="" className={classes.avatar} />}
        </Typography>
        <Typography  variant="h6" gutterBottom>
          Primary Team: {event.primary.name} - ({event.odds})
        </Typography>
        <Typography  variant="h6" gutterBottom>
          Secondary Team: {event.secondary.name} - ({-event.odds})
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {event.eventStatus.name} - betted({event.tickets.length})
        </Typography>
        { userTicket && <Alert severity="info">You betted on this event already!</Alert> }
      </CardContent>
      {isAdmin ? <CardActions>
        {event.eventStatusId === EVENT_STATUS_NON_RESOLVED_ID && <ResolveModal event={event} eventStatus={eventStatus} setEvents={setEvents} />}
        {event.eventStatusId !== EVENT_STATUS_NON_RESOLVED_ID && <Button variant="contained" color="secondary" disabled>Already Resolved</Button>}
      </CardActions>
      :
      ((currentUser && !currentUser.roles.includes("ROLE_ADMIN")) || !currentUser) && <CardActions>
        { userTicket ? <ShowTicket ticket={userTicket} event={event} /> : <AddTicket event={event} setEvents={setEvents} />}
      </CardActions>
      }
    </Card>
  );
}
