import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/slices/userSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().max(20, 'Username must be at most 20 characters').required('Username is required'),
    password: Yup.string().max(20, 'Password must be at most 20 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    const action = await dispatch(register(values));
    setSubmitting(false);

    if (action.meta.requestStatus === 'fulfilled') {
      localStorage.setItem('token', action.payload.token);
      navigate('/home');
    } else if (action.payload) {
      setFieldError('username', action.payload.message || 'Registration failed');
    } else {
      alert(`Registration failed: Please try again.`);
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
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
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
              <Field
                name='confirmPassword'
                as={TextField}
                label='Confirm Password'
                type='password'
                fullWidth
                margin='normal'
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={<ErrorMessage name='confirmPassword' />}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>
        <Button variant='text' color='primary' onClick={handleLogin} sx={{ mt: 2 }}>
          Already have an account? Login here
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
