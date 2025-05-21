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
import { useUser, SignOutButton } from '@clerk/clerk-react';

const linkStyle = {
  textDecoration: 'none',
};

const pages = [
  <Link to="/" style={linkStyle}>Home</Link>,
  <Link to="/about" style={linkStyle}>About</Link>,
  <Link to="/Contact" style={linkStyle}>Contact </Link>,
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { isSignedIn } = useUser();

  return (
    <AppBar position="static sticky" sx={{
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
                fontSize: { xs: '1.4rem', md: '1.2rem', lg: '1.6rem' },
              }}
            >
              <StarIcon sx={{ color: 'green', mr: 3, fontSize: { xs: '2rem', md: '1.5rem' } }} />
              Mindfullme
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: isSignedIn ? 'none' : 'flex', md: 'none' }, justifyContent: 'center' }}>
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
            {isSignedIn ? (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none' }}
                component={Link}
                to="/dashboard"
              >
                Dashboard
              </Button>
            ) : (
              pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none' }}
                >
                  {page}
                </Button>
              ))
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              ml: 'auto',
            }}
          >
            {isSignedIn ? (
              <SignOutButton>
                <button className="text-xs px-2 py-1 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 transition md:px-6 md:py-2">
                  Logout
                </button>
              </SignOutButton>
            ) : (
              <>
                <Link to="/login?mode=signin" style={linkStyle}>
                  <button className="text-xs px-2 py-1 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50 transition md:px-6 md:py-2">
                    Login
                  </button>
                </Link>
                <Link to="/login?mode=signup" style={linkStyle}>
                  <button className="text-xs px-2 py-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition md:px-6 md:py-2">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
