import * as React from 'react';
import { makeStyles } from 'tss-react/mui';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ShowEvent from '../Event/ShowEvent';
import TennisAvatar from '../../assets/img/tennis.png';
import FootballAvatar from '../../assets/img/football.png';
import CheckMarker from '../../assets/img/checkmark.png';
import NonResolved from '../../assets/img/waiting.png'
import Winner from '../../assets/img/win.png'; 
import Lost from '../../assets/img/lost.png';
import Drawn from '../../assets/img/draw.png';
import { 
  SPORT_FOOTBALL_ID
} from '../../common/Consts';

const useStyles = makeStyles()(theme => ({
  avatar: {
    width: 50,
  },
  marker: {
    width: 20
  },
  bettedTeam: {
    color: '#41AD49',
    fontSize: 15
  },
  betResult: {
    width: 30
  }
}));

const images = [NonResolved, Winner, Lost, Drawn];

export default function TicketCard(props) {
  const { ticket } = props;
  const { classes } = useStyles();
  
  const BettedTeam = () => {
    return <>
      <img src={CheckMarker} alt="" className={classes.marker} />
      <span className={classes.bettedTeam}> Your Betted Team</span>
    </>
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography  variant="h6" color="text.secondary">
          {ticket.event.sport.name} - Ticket Card {ticket.event.sport.id === SPORT_FOOTBALL_ID
            ? <img src={FootballAvatar} alt="" className={classes.avatar} /> 
            : <img src={TennisAvatar} alt="" className={classes.avatar} />}
        </Typography>
        <Typography  variant="h6" gutterBottom>
          Primary Team: {ticket.event.primary.name} - ({ticket.event.odds}) {ticket.winnerType && <BettedTeam />
          } 
        </Typography>
        <Typography  variant="h6" gutterBottom>
          Secondary Team: {ticket.event.secondary.name} - ({-ticket.event.odds})  {!ticket.winnerType && <BettedTeam />}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Risking: ${ticket.risking}, Win Prize: ${ticket.prize}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {ticket.ticketStatus.name} <img src={images[ticket.ticketStatusId - 1]} alt="" className={classes.betResult} />
        </Typography>
      </CardContent>
      <CardActions>
        <ShowEvent event={ticket.event}/>
      </CardActions>
    </Card>
  );
}
