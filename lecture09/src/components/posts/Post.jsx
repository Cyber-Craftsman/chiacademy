import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Box, Avatar, Collapse } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentList from '../comments/CommentList.jsx';

const Post = ({ post, currentUser, onDelete, isSubmitting }) => {
  const [expanded, setExpanded] = useState(false);
  const baseURL = process.env.REACT_APP_API_URL;
  const imageSrc = `${baseURL}${post.imageUrl}`;

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const isPostOwner = currentUser && post.user && currentUser.id === post.user.id;

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
        {isPostOwner && onDelete && (
          <IconButton aria-label='delete' onClick={() => onDelete(post.id)} disabled={isSubmitting} sx={{ mt: 2 }}>
            <DeleteIcon />
          </IconButton>
        )}
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
