import React from 'react';
import { Container, Box } from '@mui/material';

const ErrorMessage = ({ message }) => {
  return (
    <Container maxWidth='md'>
      <Box display='flex' justifyContent='center' mt={2}>
        <p>Error fetching posts: {message}</p>
      </Box>
    </Container>
  );
};

export default ErrorMessage;
