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
import { NotificationProvider } from './components/Notification.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <NotificationProvider>
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
      </NotificationProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
