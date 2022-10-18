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
import { 
  SPORT_FOOTBALL_ID
} from "../../common/Consts";

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
  }
}));

export default function ViewEvent(props) {
  const { classes } = useStyles();
  const [open, setOpen] = React.useState(false);
  const { event } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className={classes.button}>
        Show Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Event Card</DialogTitle>
        <DialogContent>
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
            {event.eventStatus.name}
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
