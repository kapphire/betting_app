import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { addEvent, resolveAllEvent } from "../../services/event.service";
import { 
  ADD_EVENT_NULL_ERROR, 
  ADD_EVENT_SAME_TEAM_ERROR, 
  ADD_EVENT_SPORT_ERROR, 
  ADD_EVENT_ODDS_ERROR 
} from "../../common/Consts";
import Notification from '../Lib/Notification';

const useStyles = makeStyles()(theme => ({
	selector: {
    marginTop: 10,
  },
  button: {
    marginRight: 10
  },
  errorMessage: {
    color: 'red'
  }
}));

export default function AddEvent(props) {
  const { classes } = useStyles();
  const [open, setOpen] = React.useState(false);
  const [primary, setPrimary] = React.useState(null);
  const [secondary, setSecondary] = React.useState(null);
  const [sport, setSport] = React.useState(null);
  const [odds, setOdds] = React.useState(100);
  const [error, setError] = React.useState();
  const [isValid, setValid] = React.useState(true);
  const [notificationSuccess, setNotificationSuccess] = React.useState(true);
  const [notificationMessage, setNotificationMessage] = React.useState();
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const { teams, sports, setEvents } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrimaryChange = (event) => {
    setPrimary(event.target.value);
  };

  const handleSecondaryChange = (event) => {
    setSecondary(event.target.value);
  };

  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleCloseNotification = (event) => {
    setNotificationOpen(false);
  }

  const handleAddEvent = () => {
    if (primary === null || secondary === null) {
      setValid(false);
      setError(ADD_EVENT_NULL_ERROR);
    }
    else if(primary === secondary) {
      setValid(false);
      setError(ADD_EVENT_SAME_TEAM_ERROR);
    }
    else if(sport === null) {
      setValid(false);
      setError(ADD_EVENT_SPORT_ERROR);
    }
    else if(Math.abs(odds) < 100) {
      setValid(false);
      setError(ADD_EVENT_ODDS_ERROR);
    }
    else {
      addEvent({
        primary: primary,
        secondary: secondary,
        sportsType: sport,
        odds: odds
      }).then(res => {
        setEvents([]);
        setPrimary(null);
        setSecondary(null);
        setSport(null);
        setOdds(100);
        setOpen(false);
        setValid(true);
        setEvents(res.data);
        setNotificationOpen(true);
        setNotificationMessage('New Event created successfully!');
        setNotificationSuccess(true);
      })
      .catch(err => {
        setNotificationOpen(true);
        setNotificationMessage(err.message);
        setNotificationSuccess(false);
      });
    }
  }

  const handleResolveAllEvent = () => {
    resolveAllEvent().then(res => {
      setEvents([]);
      setEvents(res.data);
    })
    .catch(err => console.log(err.message));
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className={classes.button}>
        Add Event
      </Button>
      <Button variant="outlined" onClick={handleResolveAllEvent}>Resolve All Events</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create game event please select the proper data. Event will be created and users can bet on this card.
          </DialogContentText>
          {!isValid && <Typography className={classes.errorMessage}>{error}</Typography>}
          <FormControl variant="filled" fullWidth className={classes.selector}>
            <InputLabel id="primary-label">Primary</InputLabel>
            <Select
              labelId="primary-label"
              id="primary-select-standard"
              value={primary}
              onChange={handlePrimaryChange}
              label="Primary Team"
              fullWidth
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              {
                teams.map((team, index) => (
                  <MenuItem value={team.id} key={index}>{team.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl variant="filled" fullWidth className={classes.selector}>
            <InputLabel id="secondary-label">Secondary</InputLabel>
            <Select
              labelId="secondary-label"
              id="secondary-select-standard"
              value={secondary}
              onChange={handleSecondaryChange}
              label="Secondary Team"
              fullWidth
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              {
                teams.map((team, index) => (
                  <MenuItem value={team.id} key={index}>{team.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl variant="filled" fullWidth className={classes.selector}>
            <InputLabel id="game-label">Game Type</InputLabel>
            <Select
              labelId="game-label"
              id="game-select-standard"
              value={sport}
              onChange={handleSportChange}
              label="Game Type"
              fullWidth
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              {
                sports.map((sport, index) => (
                  <MenuItem value={sport.id} key={index}>{sport.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Odds"
            type="number"
            step={1}
            fullWidth
            variant="filled"
            value={odds}
            onChange={(event) => setOdds(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleAddEvent} variant="outlined">Add</Button>
        </DialogActions>
      </Dialog>
      <Notification isSuccess={notificationSuccess} message={notificationMessage} open={notificationOpen} handleClose={handleCloseNotification} />
    </div>
  );
}
