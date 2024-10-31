// src/components/SidePanel.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '@fontsource/roboto';
import { Box, SwipeableDrawer, Toolbar, Typography, CircularProgress } from '@mui/material';
import { useRequest } from 'ahooks';
import { fetchCharacterById } from '../api/characterApi';

const drawerWidth = 300;

const SidePanel = () => {
  const { id: characterId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    data: character,
    loading,
    error,
  } = useRequest(() => fetchCharacterById(characterId), {
    ready: !!characterId,
    onSuccess: () => setOpen(true),
    onError: (error) => console.error('Error fetching character details:', error),
  });

  useEffect(() => {
    if (!characterId) {
      setOpen(false);
    }
  }, [characterId]);

  const handleDrawerClose = () => {
    setOpen(false);
    setTimeout(() => {
      navigate('/heroes');
    }, 300);
  };

  return (
    <SwipeableDrawer
      anchor='right'
      open={open}
      onClose={handleDrawerClose}
      onOpen={() => setOpen(true)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', padding: 2 },
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color='error'>Failed to load character details. Please try again later.</Typography>
      ) : (
        character && (
          <Box>
            <Toolbar />
            <Typography variant='h5'>{character.name}</Typography>
            <Box
              component='img'
              src={character.image}
              alt={character.name}
              sx={{
                width: '100%',
                borderRadius: 2,
              }}
            />
            <Typography>Status: {character.status}</Typography>
            <Typography>Species: {character.species}</Typography>
            <Typography>Gender: {character.gender}</Typography>
          </Box>
        )
      )}
    </SwipeableDrawer>
  );
};

export default SidePanel;
