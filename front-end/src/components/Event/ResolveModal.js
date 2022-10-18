import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from 'tss-react/mui';
import { resolveEvent } from "../../services/event.service";
import { 
  SPORT_TENNIS_ID,
  EVENT_STATUS_PRIMARY_WON_ID,
  EVENT_STATUS_SECONDARY_WON_ID,
  EVENT_STATUS_DRAWN_ID
} from "../../common/Consts";

const useStyles = makeStyles()(theme => ({
	selector: {
    marginTop: 10,
  },
  button: {
    marginRight: 10
  }
}));

export default function ResolveModal(props) {
  const { classes } = useStyles();
  const { event, eventStatus, setEvents } = props;
  const [open, setOpen] = React.useState(false);
  const [resolve, setResolve] = React.useState(event.eventStatusId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setResolve(event.target.value);
  };

  const handleChangeStatus = () => {

    resolveEvent(event.id, {
      eventStatusId: resolve,
    }).then(res => {
      setEvents([]);
      setEvents(res.data);
      setOpen(false);
    })
    .catch(err => console.log(err.message));
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className={classes.button}>
        Resolve Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Resolve Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can select the event result here. Tennis event has no drawn result. Only football available.
          </DialogContentText>
          <FormControl variant="filled" fullWidth className={classes.selector}>
            <InputLabel id="status-label">Event Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select-standard"
              value={resolve}
              onChange={handleChange}
              label="Event Status"
              fullWidth
            >
              {
                eventStatus.map((status, index) => (
                  (event.sportId !== SPORT_TENNIS_ID || status.id !== EVENT_STATUS_DRAWN_ID) && 
                    <MenuItem value={status.id} key={index}>{status.name} {status.id === EVENT_STATUS_PRIMARY_WON_ID
                      ? `( ${event.primary.name} )` 
                      : (status.id === EVENT_STATUS_SECONDARY_WON_ID
                        ? `( ${event.secondary.name} )` 
                        : ``)}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangeStatus}>Resolve</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
