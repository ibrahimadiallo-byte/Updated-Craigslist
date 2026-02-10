import axios from 'axios';

const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const listingsAPI = {
  // Get all listings
  getAll: () => apiClient.get('/listings'),

  // Get listings by category
  getByCategory: (category) => apiClient.get('/listings', { params: { category } }),

  // Get single listing by ID
  getById: (id) => apiClient.get(`/listings/${id}`),

  // Create new listing
  create: (formData) => apiClient.post('/listings', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  // Create listing (JSON version for no image)
  createJSON: (data) => apiClient.post('/listings', data),
};

export default apiClient;
