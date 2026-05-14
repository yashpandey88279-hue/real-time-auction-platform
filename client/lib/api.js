import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const registerUser = (data) => apiClient.post('/auth/register', data);
export const loginUser = (data) => apiClient.post('/auth/login', data);

// Auction endpoints
export const getAuctions = () => apiClient.get('/auctions');
export const getAuctionById = (id) => apiClient.get(`/auctions/${id}`);
export const createAuction = (data) => apiClient.post('/auctions', data);
export const updateAuction = (id, data) => apiClient.put(`/auctions/${id}`, data);
export const deleteAuction = (id) => apiClient.delete(`/auctions/${id}`);
export const getUserAuctions = () => apiClient.get('/auctions/user/auctions');
export const getUserBids = () => apiClient.get('/auctions/user/bids');
