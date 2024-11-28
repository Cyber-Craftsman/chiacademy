import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/exhibitActions';
import PostForm from '../components/posts/PostForm.jsx';

const NewPostPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('description', values.description);
    if (values.image) formData.append('image', values.image);

    setIsSubmitting(true);
    try {
      await createPost(formData);
      alert('Post created successfully');
      resetForm();
      navigate('/myposts');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' gutterBottom sx={{ mt: 8, textAlign: 'center' }}>
        Create New Post
      </Typography>
      <PostForm handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Container>
  );
};

export default NewPostPage;
