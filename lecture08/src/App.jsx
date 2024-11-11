import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/slices/userSlice';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import MyPostsPage from './layouts/MyPostsPage.jsx';
import AllPostsPage from './layouts/AllPostsPage.jsx';
import AppBarComponent from './components/AppBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const theme = createTheme();

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBarComponent onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<AllPostsPage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route
          path='/myposts'
          element={
            <ProtectedRoute isAllowed={!!currentUser}>
              <MyPostsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
