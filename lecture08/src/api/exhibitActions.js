import axiosInstance from './axiosInstance';

export const fetchMyPosts = async () => {
  try {
    const response = await axiosInstance.get('/api/exhibits/my-posts');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching my posts:', error);
    throw error;
  }
};

export const createPost = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/exhibits', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/api/exhibits/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const fetchExhibits = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get('/api/exhibits', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exhibits:', error);
    throw error;
  }
};
