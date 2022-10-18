import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EventTab from './Event/EventTab';
import { IN_PROGRESS_EVENT, RESOLVED_EVENT } from '../common/Consts';

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
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable">
            <Tab label="In Progress" value="1" />
            <Tab label="Resolved" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><EventTab filter={IN_PROGRESS_EVENT} /></TabPanel>
        <TabPanel value="2"><EventTab filter={RESOLVED_EVENT} /></TabPanel>
      </TabContext>
    </Box>
  );
}