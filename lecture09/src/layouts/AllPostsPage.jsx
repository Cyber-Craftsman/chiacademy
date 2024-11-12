import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { fetchExhibits } from '../api/exhibitActions';
import Post from '../components/Post.jsx';
import Pagination from '../components/Pagination.jsx';
import { useNotification } from '../components/Notification.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 10;
  const { newPost, setNewPost } = useNotification();

  useEffect(() => {
    const getExhibits = async () => {
      setLoading(true);
      try {
        const data = await fetchExhibits(page, postsPerPage);
        setPosts(data.data || []);
        setLastPage(data.lastPage || 1);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getExhibits();

    if (newPost) {
      toast.info('A new post has been created!');
      if (page === 1) {
        getExhibits();
      }
      setNewPost(false);
    }
  }, [page, newPost, setNewPost]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} direction='column' justifyContent='center' alignItems='center'>
            {posts.map((post) => (
              <Grid
                key={post.id}
                xs={12}
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ maxWidth: 800, width: '100%' }}>
                  <Post post={post} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
          <Pagination count={lastPage} page={page} onPageChange={handlePageChange} />
        </Box>
        <ToastContainer />
      </Box>
    </Container>
  );
};

export default AllPostsPage;
