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

export const askQuestion = async (id, question) => {
  const response = await api.post(`/api/documents/${id}/ask`, { question });
  return response.data;
};

export const streamChat = async (id, messages) => {
  const response = await api.post(`/api/documents/${id}/chat/stream`, { messages });
  return response.data;
};

// Tags
export const createTag = async (name) => {
  const response = await api.post('/api/tags', { name });
  return response.data;
};

export const getTags = async () => {
  const response = await api.get('/api/tags');
  return response.data;
};

export const getTag = async (id) => {
  const response = await api.get(`/api/tags/${id}`);
  return response.data;
};

export const updateTag = async (id, name) => {
  const response = await api.put(`/api/tags/${id}`, { name });
  return response.data;
};

export const deleteTag = async (id) => {
  const response = await api.delete(`/api/tags/${id}`);
  return response.data;
};

export const addTagToDocument = async (documentId, tagId) => {
  const response = await api.post('/api/tags/addToDocument', { documentId, tagId });
  return response.data;
};

export const removeTagFromDocument = async (documentId, tagId) => {
  const response = await api.post('/api/tags/removeFromDocument', { documentId, tagId });
  return response.data;
};

export const getDocumentsByTag = async (tagId) => {
  const response = await api.get(`/api/tags/${tagId}/documents`);
  return response.data;
};

export const searchTags = async (query) => {
  const response = await api.get(`/api/tags/search?query=${query}`);
  return response.data;
};

// Conversations
export const createConversation = async (title) => {
  const response = await api.post('/api/conversations', { title });
  return response.data;
};

export const getConversations = async () => {
  const response = await api.get('/api/conversations');
  return response.data;
};

export const getConversation = async (id) => {
  const response = await api.get(`/api/conversations/${id}`);
  return response.data;
};

export const updateConversation = async (id, title) => {
  const response = await api.patch(`/api/conversations/${id}`, { title });
  return response.data;
};

export const deleteConversation = async (id) => {
  const response = await api.delete(`/api/conversations/${id}`);
  return response.data;
};

export const addMessageToConversation = async (conversationId, content) => {
  const response = await api.post(`/api/conversations/${conversationId}/messages`, { content });
  return response.data;
};

// Document Types
export const createDocumentType = async (name, description) => {
  const response = await api.post('/api/document-types', { name, description });
  return response.data;
};

export const getDocumentTypes = async () => {
  const response = await api.get('/api/document-types');
  return response.data;
};

export const getDocumentType = async (id) => {
  const response = await api.get(`/api/document-types/${id}`);
  return response.data;
};

export const updateDocumentType = async (id, name, description) => {
  const response = await api.put(`/api/document-types/${id}`, { name, description });
  return response.data;
};

export const deleteDocumentType = async (id) => {
  const response = await api.delete(`/api/document-types/${id}`);
  return response.data;
};

// Roles
export const createRole = async (name) => {
  const response = await api.post('/api/roles', { name });
  return response.data;
};

export const assignRole = async (userId, roleId) => {
  const response = await api.post('/api/roles/assign', { userId, roleId });
  return response.data;
};

export const getUserRoles = async (userId) => {
  const response = await api.get(`/api/roles/user/${userId}`);
  return response.data;
};

// Search
export const searchDocuments = async (query) => {
  const response = await api.get(`/api/search?query=${query}`);
  return response.data;
};

// Files
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getFile = async (id) => {
  const response = await api.get(`/api/files/${id}`);
  return response.data;
};

export const deleteFile = async (id) => {
  const response = await api.delete(`/api/files/${id}`);
  return response.data;
};

export default api;