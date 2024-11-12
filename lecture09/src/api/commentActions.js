import axiosInstance from './axiosInstance';

export const fetchComments = async (exhibitId) => {
  try {
    const response = await axiosInstance.get(`/api/exhibits/${exhibitId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const addComment = async (exhibitId, comment, token) => {
  try {
    const response = await axiosInstance.post(
      `/api/exhibits/${exhibitId}/comments`,
      { text: comment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const deleteComment = async (exhibitId, commentId, token) => {
  try {
    const response = await axiosInstance.delete(`/api/exhibits/${exhibitId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
