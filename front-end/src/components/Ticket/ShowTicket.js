import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import TennisAvatar from '../../assets/img/tennis.png';
import FootballAvatar from '../../assets/img/football.png';
import CheckMarker from '../../assets/img/checkmark.png';
import { 
  SPORT_FOOTBALL_ID
} from '../../common/Consts';

const useStyles = makeStyles()(theme => ({
	selector: {
    marginTop: 10,
  },
  button: {
    marginRight: 10
  },
  errorMessage: {
    color: 'red'
  },
  avatar: {
    width: 50,
  },
  marker: {
    width: 20
  },
  bettedTeam: {
    color: '#41AD49',
    fontSize: 15
  }
}));

export default function ViewEvent(props) {
  const { classes } = useStyles();
  const [open, setOpen] = React.useState(false);
  const { ticket, event } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const BettedTeam = () => {
    return <>
      <img src={CheckMarker} alt="" className={classes.marker} />
      <span className={classes.bettedTeam}> Your Betted Team</span>
    </>
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className={classes.button}>
        Show Ticket
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Ticket Card</DialogTitle>
        <DialogContent>
            <Typography  variant="h6" color="text.secondary">
            {event.sport.name} - Ticket Card {event.sport.id === SPORT_FOOTBALL_ID
            ? <img src={FootballAvatar} alt="" className={classes.avatar} /> 
            : <img src={TennisAvatar} alt="" className={classes.avatar} />}
            </Typography>
            <Typography  variant="h6" gutterBottom>
            Primary Team: {event.primary.name} {ticket.winnerType === true && <BettedTeam />}
            </Typography>
            <Typography  variant="h6" gutterBottom>
            Secondary Team: {event.secondary.name} {ticket.winnerType === false && <BettedTeam />}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Win Prize: {ticket.prize}, Risk: {ticket.risking}, Odds: {ticket.winnerType === true ? event.odds : -event.odds}
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
