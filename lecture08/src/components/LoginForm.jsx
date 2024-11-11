import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/userSlice';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const action = await dispatch(login(credentials));
    setLoading(false);

    if (action.meta.requestStatus === 'fulfilled') {
      localStorage.setItem('token', action.payload.access_token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: action.payload.userId,
          username: action.payload.userName,
        })
      );
      navigate('/myposts');
    } else {
      // Відобразіть конкретну помилку користувачу
      alert(`Login failed: ${action.payload.message || 'please try again.'}`);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth='xs'>
      <Box sx={{ mt: 8 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Username'
            name='username'
            margin='normal'
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            name='password'
            margin='normal'
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
        <Button variant='text' color='primary' onClick={handleRegister} sx={{ mt: 2 }}>
          Don't have an account? Register here
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
