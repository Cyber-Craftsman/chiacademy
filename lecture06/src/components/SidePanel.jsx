import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fontsource/roboto';
import { Box, Drawer, Toolbar, Typography, CircularProgress } from '@mui/material';

const API_URL = 'https://rickandmortyapi.com/api/character';
const drawerWidth = 300;

const SidePanel = ({ isOpen, onClose, characterId }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (characterId) {
      const fetchCharacter = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/${characterId}`);
          setCharacter(response.data);
        } catch (error) {
          console.error('Error fetching character details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCharacter();
    }
  }, [characterId]);

  return (
    <Drawer
      anchor='right'
      open={isOpen}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', padding: 2 },
      }}
    >
      {loading ? (
        <CircularProgress />
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
    </Drawer>
  );
};

export default SidePanel;
