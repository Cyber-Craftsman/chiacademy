import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import Post from './Post.jsx';

const PostsList = ({ posts, currentUser, onDelete, isSubmitting }) => {
  return (
    <Grid container spacing={2} direction='column' justifyContent='center' alignItems='center'>
      {posts?.map((post) => (
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
            <Post post={post} currentUser={currentUser} onDelete={onDelete} isSubmitting={isSubmitting} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsList;
