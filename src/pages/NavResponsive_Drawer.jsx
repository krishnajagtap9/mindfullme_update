import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    display: 'block'
  };

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Daily Logs', path: '/daily_log' },
    { name: 'Resource Library', path: '/Resource_Library' },
    { name: 'Community', path: '/Community' },
    { name: 'Crisis Support', path: '/Crisis_suport' },
    { name: 'Sign In', path: '/sign-in' },
    { name: 'Sign Up', path: '/sign-up' },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton component={Link} to={page.path} style={linkStyle}>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: 'white' }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
