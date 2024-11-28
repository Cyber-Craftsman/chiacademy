import React, { useEffect, useState, useCallback } from 'react';
import { Container, Box } from '@mui/material';
import { fetchExhibits, deletePost } from '../api/exhibitActions';
import { useNotification } from '../components/Notification.jsx';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRequest from '../hooks/useRequest';
import PostsList from '../components/posts/PostsList.jsx';
import Loading from '../components/layouts/Loading.jsx';
import ErrorMessage from '../components/layouts/ErrorMessage.jsx';
import Pagination from '../components/Pagination.jsx';

const AllPostsPage = () => {
  const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const { newPost, setNewPost } = useNotification();
  const currentUser = useSelector((state) => state.user.user);

  const fetchPosts = useCallback(() => fetchExhibits(page, postsPerPage), [page, postsPerPage]);

  const { data, loading, error, refresh } = useRequest(fetchPosts, [fetchPosts, page, newPost]);

  useEffect(() => {
    if (newPost) {
      toast.info('A new post has been created!');
      if (page === 1) {
        refresh();
      }
      setNewPost(false);
    }
  }, [newPost, page, setNewPost, refresh]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      toast.success('Post deleted successfully');
      refresh();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <Container maxWidth='md'>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PostsList posts={data?.data} currentUser={currentUser} onDelete={handleDelete} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
          <Pagination count={data?.lastPage || 1} page={page} onPageChange={handlePageChange} />
        </Box>
      </Box>
    </Container>
  );
};

export default AllPostsPage;
