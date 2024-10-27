import React from 'react';
import '@fontsource/roboto';
import { Box, Typography, Toolbar } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant='h4' gutterBottom>
        About This App
      </Typography>
      <Typography variant='body1'>
        This app displays characters from Rick & Morty using React, MUI, and React Router.
      </Typography>
    </Box>
  );
};

export default About;
