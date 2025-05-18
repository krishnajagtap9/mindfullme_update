import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import NavResponsive_Drawer from '../pages/NavResponsive_Drawer';
import StarIcon from '@mui/icons-material/Star';

const linkStyle = {
  textDecoration: 'none',
};

const pages = [
  <Link to="/" style={linkStyle}>Home</Link>,
  <Link to="/Library" style={linkStyle}>Library</Link>,
  <Link to="/Games" style={linkStyle}>Games</Link>,
  <Link to="/Community" style={linkStyle}>Community</Link>,
  <Link to="/support" style={linkStyle}>Support</Link>,
  <Link to="/sign-in" style={linkStyle}>Sign In</Link>,
  <Link to="/sign-up" style={linkStyle}>Sign Up</Link>,
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static sticky"  sx={{ 
    backgroundColor: 'white', 
    boxShadow: 1,
    top: 0, 
    zIndex: (theme) => theme.zIndex.drawer + 1 
  }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          
    
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: { xs: 400, md: 700 },
                color: 'green',
                textDecoration: 'none',
                fontSize: { xs: '0.9rem', md: '1.2rem', lg: '1.6rem' },
              }}
            >
              <StarIcon sx={{ color: 'green', mr: 1, fontSize: { xs: '1rem', md: '1.5rem' } }} />
              Mindfullme
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <NavResponsive_Drawer />
            </IconButton>
          </Box>

    
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
         
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right-aligned Login/Sign Up */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              ml: 'auto',
            }}
          >
            <button className="text-xs px-2 py-1 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50 transition md:px-6 md:py-2">
              Login
            </button>
            <button className="text-xs px-2 py-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition md:px-6 md:py-2">
              Sign Up
            </button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

