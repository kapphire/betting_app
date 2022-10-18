import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TicketTab from './Ticket/TicketTab';
import {
  ALL_TICKET,
  NONRESOVLVED_TICKET,
  WON_TICKET,
  LOST_TICKET,
  DRAWN_TICKET
} from '../common/Consts';

export default function BoardAdmin() {
  const [value, setValue] = React.useState('1');
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    {currentUser && <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="tickets tab" variant="scrollable">
            <Tab label="All" value="1" />
            <Tab label="Non Resolved" value="2" />
            <Tab label="Won" value="3" />
            <Tab label="Lost" value="4" />
            <Tab label="Drawn" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1"><TicketTab filter={ALL_TICKET} /></TabPanel>
        <TabPanel value="2"><TicketTab filter={NONRESOVLVED_TICKET} /></TabPanel>
        <TabPanel value="3"><TicketTab filter={WON_TICKET} /></TabPanel>
        <TabPanel value="4"><TicketTab filter={LOST_TICKET} /></TabPanel>
        <TabPanel value="5"><TicketTab filter={DRAWN_TICKET} /></TabPanel>
      </TabContext>
    </Box>}
    </>
  );
}