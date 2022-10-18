import * as React from 'react';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { addTicket } from "../../services/ticket.service";
import { ADD_TICKET_BALANCE_ERROR } from "../../common/Consts";
import Notification from '../Lib/Notification';

const useStyles = makeStyles()(theme => ({
	selector: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red'
  }
}));

export default function AddTicket(props) {
  const { classes } = useStyles();
  const { event, setEvents } = props;
  const { user: currentUser } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [primaryOdds, setPrimaryOdds] = React.useState(event.odds);
  const [secondaryOdds, setSecondaryOdds] = React.useState(-event.odds);
  const [risk, setRisk] = React.useState(100);
  const [prize, setPrize] = React.useState(0);
  const [winner, setWinner] = React.useState(event.primaryId);
  const [winnerType, setWinnerType] = React.useState(true);
  const [error, setError] = React.useState();
  const [isValid, setValid] = React.useState(true);
  const [notificationSuccess, setNotificationSuccess] = React.useState(true);
  const [notificationMessage, setNotificationMessage] = React.useState();
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  React.useEffect(() => {
    if(parseInt(winner) === parseInt(event.primaryId)) calculatePrize(primaryOdds, risk);
    else calculatePrize(secondaryOdds, risk);
  }, [primaryOdds, secondaryOdds, winner, risk, event]);

  const handleClickOpen = () => {
    if(currentUser) setOpen(true);
    else setOpenAlert(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  }

  const handleAddTicket = () => {
    if (risk > currentUser.balance) {
      setValid(false);
      setError(ADD_TICKET_BALANCE_ERROR);
    }
    else {
      addTicket({
        userId: currentUser.id,
        eventId: event.id,
        risking: risk,
        winnerId: winner,
        winnerType: winnerType, //Who is winner? Primary / Secondary
        prize: prize
      }).then(res => {
        setOpen(false);
        setEvents([])
        setNotificationOpen(true);
        setNotificationMessage('Your Ticket created successfully!');
        setNotificationSuccess(true);
        setEvents(res.data.events)
      })
      .catch(err => {
        setNotificationOpen(true);
        setNotificationMessage(err.message);
        setNotificationSuccess(false);
      });
    }
  }

  const calculatePrize = (odds, riskValue) => {
    if(odds < 0) {
      setPrize(Math.abs(100 / odds * riskValue).toFixed(2));
    }
    else {
      setPrize(Math.abs(riskValue / 100 * odds).toFixed(2));
    }
  }

  const handleCloseNotification = (event) => {
    setNotificationOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Bet Now
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bet Now</DialogTitle>
        <DialogContent>
          {!isValid && <Typography className={classes.errorMessage}>{error}</Typography>}
          <FormControl>
            <FormLabel id="winner-selection-group-label">Winner Selection</FormLabel>
            <RadioGroup
              aria-labelledby="winner-selection-group-label"
              value={winner}
              onChange={(event) => { setWinner(event.target.value); setWinnerType(!winnerType); }}
              name="winner-selection-buttons-group"
            >
              <FormControlLabel value={event.primaryId} control={<Radio />} label={event.primary.name} />
              <FormControlLabel value={event.secondaryId} control={<Radio />} label={event.secondary.name} />
            </RadioGroup>
          </FormControl>
          <FormControl variant="filled" fullWidth className={classes.selector}>
            <InputLabel id="primary-label">{`${event.primary.name} Odds`}</InputLabel>
            <TextField
              margin="dense"
              id="primary"
              type="number"
              step={1}
              fullWidth
              variant="filled"
              value={primaryOdds}
              onChange={(event) => {
                setPrimaryOdds(event.target.value);
                setSecondaryOdds(-event.target.value);
              }}
            />
          </FormControl>
          <FormControl variant="filled" fullWidth className={classes.selector}>
            <InputLabel id="secondary-label">{`${event.secondary.name} Odds`}</InputLabel>
            <TextField
              margin="dense"
              id="secondary"
              type="number"
              step={1}
              fullWidth
              variant="filled"
              value={secondaryOdds}
              onChange={(event) => {
                setPrimaryOdds(-event.target.value);
                setSecondaryOdds(event.target.value);
              }}
            />
          </FormControl>
          <FormControl variant="filled" fullWidth className={classes.selector}>
            <InputLabel id="risk-label">{`Risking`}</InputLabel>
            <TextField
              margin="dense"
              id="risk"
              type="number"
              step={1}
              fullWidth
              variant="filled"
              value={risk}
              onChange={(event) => setRisk(event.target.value)}
            />
          </FormControl>
          <FormControl variant="filled" fullWidth className={classes.selector}>
            <InputLabel id="risk-label">{`Win Prize`}</InputLabel>
            <TextField
              margin="dense"
              id="prize"
              type="number"
              step={0.1}
              fullWidth
              variant="filled"
              value={prize}
              disabled
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleAddTicket} variant="contained">Bet Now</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAlert} onClose={handleClose}>
        <DialogTitle>You need to sign in to bet.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are not signed in.
            Please create your free acount to sign in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
      <Notification isSuccess={notificationSuccess} message={notificationMessage} open={notificationOpen} handleClose={handleCloseNotification} />
    </div>
  );
}
