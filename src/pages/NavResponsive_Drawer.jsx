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
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    display: 'block',
  };

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/About' },
    { name: 'Contact', path: '/Contact' },
    { name: 'Sign', path: '/sign' },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 250, marginTop: '80px' }}
      role="presentation"
      onClick={toggleDrawer}
    >
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
      <Button onClick={toggleDrawer}>
        {open ? (
          <CloseIcon sx={{ color: 'black' }} />
        ) : (
          <MenuIcon sx={{ color: 'black' }} />
        )}
      </Button>
      <Drawer open={open} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
