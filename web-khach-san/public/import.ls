import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
});

export const fetchRooms = () => api.get('/rooms');
export const fetchBookings = () => api.get('/bookings');
// Thêm các hàm khác...