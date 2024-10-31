import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;

const NavBar = () => {
  const navItems = [
    { text: 'Home', icon: <HomeIcon />, to: '/' },
    { text: 'Heroes', icon: <StarIcon />, to: '/heroes' },
    { text: 'About', icon: <InfoIcon />, to: '/about' },
  ];

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.to}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavBar;
