import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/slices/userSlice';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import MyPostsPage from './pages/MyPostsPage.jsx';
import AllPostsPage from './pages/AllPostsPage.jsx';
import NewPostPage from './pages/NewPostPage.jsx';
import AppBarComponent from './components/AppBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { NotificationProvider } from './components/Notification.jsx';
import { ToastContainer, toast } from 'react-toastify';
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
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/myposts'
            element={
              <ProtectedRoute isAllowed={!!currentUser}>
                <MyPostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/newpost'
            element={
              <ProtectedRoute isAllowed={!!currentUser}>
                <NewPostPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar />
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
