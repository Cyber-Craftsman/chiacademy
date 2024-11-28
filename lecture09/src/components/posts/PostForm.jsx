import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const validationSchema = Yup.object({
  description: Yup.string().required('Description is required'),
  image: Yup.mixed().required('Image is required'),
});

const PostForm = ({ handleSubmit, isSubmitting }) => {
  return (
    <Formik
      initialValues={{ description: '', image: null }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant='h5' gutterBottom>
              Create New Post
            </Typography>
            <Field
              name='description'
              as={TextField}
              label='Description'
              fullWidth
              margin='normal'
              error={touched.description && !!errors.description}
              helperText={<ErrorMessage name='description' />}
            />
            <input
              accept='image/*'
              id='image'
              name='image'
              type='file'
              onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
              required
            />
            {errors.image && touched.image ? <div style={{ color: 'red' }}>{errors.image}</div> : null}
            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{ mt: 2 }}
              startIcon={isSubmitting ? <CircularProgress size={24} /> : <AddIcon />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
