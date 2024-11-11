import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Avatar, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentList from './CommentList.jsx';

const Post = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const baseURL = process.env.REACT_APP_API_URL;
  const imageSrc = `${baseURL}${post.imageUrl}`;

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Card sx={{ mb: 2, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <Avatar sx={{ bgcolor: 'red', mr: 1 }}>{post.user.username.charAt(0)}</Avatar>
        <Box>
          <Typography>{post.user.username}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>
      <CardMedia
        component='img'
        sx={{ maxWidth: '100%', height: 'auto' }}
        image={imageSrc}
        alt={post.description || 'Post Image'}
      />
      <CardContent sx={{ p: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          Description: {post.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleExpandClick}>
          <Typography variant='body2' color='text.secondary'>
            Comments: {post.commentCount}
          </Typography>
          <IconButton aria-expanded={expanded} aria-label='show comments'>
            <ExpandMoreIcon
              sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            />
          </IconButton>
        </Box>
      </CardContent>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <CommentList postId={post.id} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
