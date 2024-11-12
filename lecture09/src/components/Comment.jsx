import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const Comment = ({ comment, onDelete }) => {
  const currentUser = useSelector((state) => state.user.user);

  const canDelete = currentUser && comment.user.username === currentUser.username;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
      <Avatar sx={{ bgcolor: 'grey', mr: 2 }}>{comment.user.username.charAt(0)}</Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='body2' fontWeight='bold'>
          {comment.user.username}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {new Date(comment.createdAt).toLocaleString()}
        </Typography>
        <Typography variant='body2'>{comment.text}</Typography>
        {canDelete && (
          <Button color='error' onClick={onDelete} size='small'>
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
