import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TermsOfUse from './TermsOfUse'
import PrivacyPolicy from './PrivacyPolicy'
import GRPDPrivacyPolicy from './GRPDPrivacyPolicy'
import CookiesPolicy from './CookiesPolicy'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <h1>Restuary Terms and Conditions</h1>
      <AppBar position="static" className="LegalAppBar">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Terms of Use" href="/termsOfUse" {...a11yProps(0)} />
          <LinkTab label="Privacy Policy" href="/PrivacyPolicy" {...a11yProps(1)} />
          <LinkTab label="GRPD" href="GRPD" {...a11yProps(2)} />
          <LinkTab label="Cookies Policy" href="/CookiesPolicy" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TermsOfUse/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PrivacyPolicy/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GRPDPrivacyPolicy/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CookiesPolicy/>
      </TabPanel>
    </div>
  );
}