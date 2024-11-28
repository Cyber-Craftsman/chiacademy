import React from 'react';
import { Container, Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Container maxWidth='md'>
      <Box display='flex' justifyContent='center' mt={2}>
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Loading;
