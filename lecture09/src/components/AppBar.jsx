import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListIcon from '@mui/icons-material/List';

const AppBarComponent = ({ onLogout }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleNavigation = useCallback(
    (path) => {
      navigate(path);
      handleMenuClose();
    },
    [navigate, handleMenuClose]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => handleNavigation('/')}
          >
            My Application
          </Typography>
          {currentUser ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  mr: 2,
                }}
                onClick={handleMenuOpen}
              >
                <AccountCircleIcon sx={{ fontSize: '1.5rem', mr: 1 }} />
                <Typography variant='h6'>{currentUser.username}</Typography>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                autoFocus={false}
                sx={{
                  '& .MuiPaper-root': {
                    width: '200px',
                  },
                }}
              >
                <MenuItem onClick={() => handleNavigation('/')} sx={{ padding: '10px 20px', minHeight: '48px' }}>
                  <ListIcon fontSize='small' sx={{ mr: 1 }} />
                  All Posts
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/myposts')} sx={{ padding: '10px 20px', minHeight: '48px' }}>
                  <PostAddIcon fontSize='small' sx={{ mr: 1 }} />
                  My Posts
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onLogout();
                    handleMenuClose();
                  }}
                  sx={{ padding: '10px 20px', minHeight: '48px' }}
                >
                  <LogoutIcon fontSize='small' sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color='inherit' onClick={() => handleNavigation('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default AppBarComponent;
