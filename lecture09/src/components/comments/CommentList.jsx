import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import Comment from './Comment.jsx';
import { fetchComments, addComment, deleteComment } from '../../api/commentActions.js';
import { useSelector } from 'react-redux';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(postId);
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setComments(data);
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };

    loadComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const commentData = await addComment(postId, newComment, token);
      setComments([...comments, commentData]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(postId, commentId, token);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <Box>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onDelete={() => handleDeleteComment(comment.id)} />
      ))}
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          fullWidth
          placeholder='Write a comment...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleAddComment}>Post</Button>
      </Box>
    </Box>
  );
};

export default CommentList;
