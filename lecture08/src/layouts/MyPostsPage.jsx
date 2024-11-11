import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { fetchMyPosts, createPost, deletePost } from '../api/exhibitActions';
import { useNavigate } from 'react-router-dom';

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      await createPost({ formData, token });
      alert('Post created successfully');
      const data = await fetchMyPosts(token);
      setPosts(data);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant='h5' gutterBottom>
              Create New Post
            </Typography>
            <TextField
              fullWidth
              label='Description'
              margin='normal'
              value={description}
              onChange={handleDescriptionChange}
              required
            />
            <input accept='image/*' type='file' onChange={handleImageChange} required />
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

          <Grid container spacing={2} sx={{ mt: 4 }} justifyContent='center'>
            {posts.map((post) => (
              <Grid item key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    width: 300, // Фіксована ширина картки
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
