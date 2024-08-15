import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post('/api/auth/register', { username, email, password });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

// Documents
export const getDocuments = async () => {
  const response = await api.get('/api/documents');
  return response.data;
};

export const getDocument = async (id) => {
  const response = await api.get(`/api/documents/${id}`);
  return response.data;
};

export const createDocument = async (title, content) => {
  const response = await api.post('/api/documents', { title, content });
  return response.data;
};

export const updateDocument = async (id, title, content) => {
  const response = await api.patch(`/api/documents/${id}`, { title, content });
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/api/documents/${id}`);
  return response.data;
};

export const summarizeDocument = async (id) => {
  const response = await api.post(`/api/documents/${id}/summarize`);
  return response.data;
};

// Chat
export const askQuestion = async (id, question) => {
  const response = await api.post(`/api/documents/${id}/ask`, { question });
  return response.data;
};

export const streamChat = async (id, messages) => {
  const response = await api.post(`/api/documents/${id}/chat/stream`, { messages });
  return response.data;
};

export default api;