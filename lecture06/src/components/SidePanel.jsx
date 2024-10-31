import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fontsource/roboto';
import { Box, SwipeableDrawer, Toolbar, Typography, CircularProgress } from '@mui/material';

const API_URL = 'https://rickandmortyapi.com/api/character';
const drawerWidth = 300;

const SidePanel = () => {
  const { id: characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (characterId) {
      const fetchCharacter = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/${characterId}`);
          setCharacter(response.data);
          setOpen(true);
        } catch (error) {
          console.error('Error fetching character details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCharacter();
    } else {
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
