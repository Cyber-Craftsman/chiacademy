import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/userSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().max(4, 'Username must be at most 4 characters').required('Username is required'),
    password: Yup.string().max(4, 'Password must be at most 4 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const action = await dispatch(login(values));
    setSubmitting(false);

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
      alert(`Login failed: ${action.payload.message || 'Please try again.'}`);
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
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field
                name='username'
                as={TextField}
                label='Username'
                fullWidth
                margin='normal'
                error={touched.username && !!errors.username}
                helperText={<ErrorMessage name='username' />}
              />
              <Field
                name='password'
                as={TextField}
                label='Password'
                type='password'
                fullWidth
                margin='normal'
                error={touched.password && !!errors.password}
                helperText={<ErrorMessage name='password' />}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
        <Button variant='text' color='primary' onClick={handleRegister} sx={{ mt: 2 }}>
          Don't have an account? Register here
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
