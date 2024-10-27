import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyAppBar from './components/AppBar.jsx';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Heroes from './pages/Heroes.jsx';
import About from './pages/About.jsx';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Router>
          <MyAppBar darkMode={darkMode} setDarkMode={setDarkMode} />
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/heroes' element={<Heroes />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
