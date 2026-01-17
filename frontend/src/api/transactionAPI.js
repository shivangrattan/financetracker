import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/transactions';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transactionAPI = {
  getAllTransactions: () => api.get(''),
  getTransactionById: (id) => api.get(`/${id}`),
  createTransaction: (transaction) => api.post('', transaction),
  updateTransaction: (id, transaction) => api.put(`/${id}`, transaction),
  deleteTransaction: (id) => api.delete(`/${id}`),
  getTransactionsByType: (type) => api.get(`/type/${type}`),
  getTransactionsByCategory: (category) => api.get(`/category/${category}`),
  getTransactionsByDateRange: (startDate, endDate) => 
    api.get('/date-range', { params: { startDate, endDate } }),
  getAllCategories: () => api.get('/categories'),
};

export default api;
