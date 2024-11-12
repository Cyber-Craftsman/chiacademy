import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  Button,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchMyPosts, createPost, deletePost } from '../api/exhibitActions';
import { useNavigate } from 'react-router-dom';

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getMyPosts = async () => {
      try {
        const data = await fetchMyPosts(token);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching my posts:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      getMyPosts();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleDelete = async (postId) => {
    setIsLoading(true);
    try {
      await deletePost(postId, token);
      alert('Post deleted successfully');
      const data = await fetchMyPosts(token);
      setPosts(data);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().required('Image is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('description', values.description);
    if (values.image) formData.append('image', values.image);

    try {
      await createPost(formData);
      alert('Post created successfully');
      const data = await fetchMyPosts();
      setPosts(data);
      resetForm();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' gutterBottom sx={{ mt: 8, textAlign: 'center' }}>
        My Posts
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Formik
            initialValues={{ description: '', image: null }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting, errors, touched }) => (
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
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files[0]);
                    }}
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

          <Grid container spacing={2} sx={{ mt: 4 }} justifyContent='center'>
            {posts.map((post) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    width: 300,
                    textAlign: 'center',
                    mb: 4,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{ height: 200, objectFit: 'cover' }}
                    image={`${baseURL}${post.imageUrl}`}
                    alt={post.description}
                  />
                  <CardContent>
                    <Typography variant='body2'>{post.description}</Typography>
                    <Typography variant='body2'>Comments: {post.commentCount}</Typography>
                    <Typography variant='body2'>Created at: {new Date(post.createdAt).toLocaleDateString()}</Typography>
                    <IconButton
                      aria-label='delete'
                      onClick={() => handleDelete(post.id)}
                      disabled={isLoading}
                      sx={{ mt: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default MyPostsPage;
