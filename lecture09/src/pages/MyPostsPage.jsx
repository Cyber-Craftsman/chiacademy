import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { fetchMyPosts, deletePost } from '../api/exhibitActions';
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/useRequest';
import Loading from '../components/layouts/Loading.jsx';
import ErrorMessageComponent from '../components/layouts/ErrorMessage.jsx';
import PostsList from '../components/posts/PostsList.jsx';

const MyPostsPage = () => {
  const token = useSelector((state) => state.user.token);
  const currentUser = useSelector((state) => state.user.user); // Отримуємо поточного користувача з Redux
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPosts = useCallback(() => fetchMyPosts(token), [token]);

  const { data: posts, loading, error, refresh } = useRequest(fetchPosts, [fetchPosts]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleDelete = async (postId) => {
    setIsSubmitting(true);
    try {
      await deletePost(postId, token);
      await refresh();
      alert('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMessageComponent message={error.message} />;

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' gutterBottom sx={{ mt: 8, textAlign: 'center' }}>
        My Posts
      </Typography>
      <PostsList posts={posts} currentUser={currentUser} onDelete={handleDelete} isSubmitting={isSubmitting} />
    </Container>
  );
};

export default MyPostsPage;
