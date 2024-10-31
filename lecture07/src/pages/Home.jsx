import React from 'react';
import '@fontsource/roboto';
import { Box, Typography, Toolbar } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant='h4' gutterBottom>
        Welcome to Rick & Morty Characters App
      </Typography>
      <Typography variant='body1'>
        This app showcases characters from the beloved animated series "Rick and Morty". Explore your favorite
        characters!
      </Typography>
    </Box>
  );
};

export default Home;
