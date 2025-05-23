import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useTheme, useMediaQuery } from '@mui/material';

// Import all your Item components
import Item1 from './Item1';
import Item2 from './Item2';
import Item3 from './Item3';
import Item4 from './Item4';
import Item5 from './Item5';
import Item6 from "../layout/Item6"

// Icons
import { FaHome } from 'react-icons/fa';
import { MdOutlineLocalLibrary, MdPeopleAlt } from 'react-icons/md';
import { TbMoodPlus } from 'react-icons/tb';
import { LuBot } from 'react-icons/lu';
import { CgGames } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { IoDocumentTextOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Item7 from '../layout/Item7';

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minHeight: 48,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  '& .MuiTab-iconWrapper': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5),
    fontSize: '1.2rem',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  '&.Mui-selected': {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.light,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    success: {
      main: '#4caf50',
      light: '#e8f5e9',
    },
    action: {
      hover: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    fontSize: 16,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ height: '100%', display: value === index ? 'block' : 'none', width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography variant="h5" component="h2" sx={{ marginBottom: 2, display: 'none' }}>
            {children && children.props && children.props.label ? children.props.label : ''}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              pr: 0,
              width: '100%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {children}
          </Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const [showTabsState, setShowTabsState] = React.useState(false);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleTabs = () => {
    if (!isLargeScreen) {
      setShowTabsState((prev) => !prev);
    }
  };

  const tabsData = [
    { label: 'Dashboard', icon: <FaHome />, component: <Item1 /> },
    { label: 'Library', icon: <MdOutlineLocalLibrary />, component: <Item4 /> },
    { label: 'AI Suggestion', icon: <LuBot />, component: <Item5 /> },
    { label: 'Community', icon: <MdPeopleAlt />, component: <Item6 /> },
    { label: 'Games', icon: <CgGames />, component: <Item2 /> },
    { label: 'Support', icon: <IoSettingsOutline />, component: <Item3 /> },
    { label: 'Profile', icon: <CgProfile />, component: <Item7 /> },
  ];

  const showTabs = isLargeScreen || showTabsState;

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: "white" }}>
        {!isLargeScreen && (
          <IconButton
            onClick={toggleTabs}
            sx={{
              position: 'fixed',
              top: 12,
              left: 18,
              zIndex: 1201,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              display: 'block',
            }}
          >
            {showTabsState ? <AiOutlineClose size={18} /> : <FiMenu size={18} />}
          </IconButton>
        )}

        {showTabs && (
          <Box
            sx={{
              display: { xs: 'block', md: 'block' },
              position: { xs: 'absolute', md: 'static' },
              minWidth: 180,
              borderRight: '1px solid',
              borderColor: 'divider',
              boxShadow: '2px 0px 5px -2px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              backgroundColor: { xs: 'background.paper', md: 'transparent' },
              zIndex: { xs: 1200, md: 'auto' },
              height: '100vh',
            }}
          >
            <Tabs
              orientation="vertical"
              variant="standard"
              value={value}
              onChange={handleChange}
              sx={{
                height: '100vh',
                '& .MuiTabs-indicator': {
                  backgroundColor: customTheme.palette.success.main,
                  left: 0,
                  width: '4px',
                },
                '& .MuiTabs-scroller': {
                  overflowY: 'auto',
                },
              }}
            >
              {tabsData.map((tab, index) => (
                <StyledTab
                  key={index}
                  label={tab.label}
                  icon={tab.icon}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
        )}

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#F0F0F0',
            height: '100vh',
            overflow: 'hidden',
            width: 0,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {tabsData.map((tab, index) => (
            <TabPanel key={index} value={value} index={index}>
              <>
                <Typography component="span" sx={{ display: 'none' }} label={tab.label} />
                <Box sx={{ width: '100%', height: '100%' }}>
                  {tab.component}
                </Box>
              </>
            </TabPanel>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}