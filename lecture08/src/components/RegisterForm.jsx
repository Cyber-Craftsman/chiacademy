import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/slices/userSlice';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const action = await dispatch(register(formData));
      if (action.meta.requestStatus === 'fulfilled') {
        localStorage.setItem('token', action.payload.token);
        navigate('/home');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth='xs'>
      <Box sx={{ mt: 8 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Register
        </Typography>
        {error && <Typography color='error'>{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Username'
            name='username'
            margin='normal'
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            name='password'
            margin='normal'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </form>
        <Button variant='text' color='primary' onClick={handleLogin} sx={{ mt: 2 }}>
          Already have an account? Login here
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
