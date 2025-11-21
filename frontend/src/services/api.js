import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '' : '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// CV API endpoints
export const cvApi = {
  // Get all CVs
  getAll: async () => {
    const response = await api.get('/api/cvs');
    return response.data;
  },

  // Upload CV
  upload: async (formData) => {
    const response = await api.post('/forms/cv-send', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update CV
  update: async (id, data) => {
    const response = await api.put(`/api/cvs/${id}`, data);
    return response.data;
  },

  // Delete CV
  delete: async (id) => {
    const response = await api.delete(`/api/cvs/${id}`);
    return response.data;
  },
};

export default api;
