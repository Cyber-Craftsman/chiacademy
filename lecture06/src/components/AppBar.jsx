import React from 'react';
import '@fontsource/roboto';
import { AppBar, Typography, Toolbar, Switch } from '@mui/material';

const MyAppBar = ({ darkMode, setDarkMode }) => (
  <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant='h6' noWrap component='div'>
        Rick and Morty App
      </Typography>
      <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
    </Toolbar>
  </AppBar>
);

export default MyAppBar;
