import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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
  const response = await api.get('/api/auth/me', { headers: getAuthHeader() });
  return response.data;
};

// Documents
export const getDocuments = async () => {
  const response = await api.get('/api/documents', { headers: getAuthHeader() });
  return response.data;
};

export const createDocument = async (title, content) => {
  const response = await api.post('/api/documents', { title, content }, { headers: getAuthHeader() });
  return response.data;
};

export const getDocument = async (id) => {
  const response = await api.get(`/api/documents/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const updateDocument = async (id, title, content) => {
  const response = await api.patch(`/api/documents/${id}`, { title, content }, { headers: getAuthHeader() });
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/api/documents/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const summarizeDocument = async (id) => {
  const response = await api.post(`/api/documents/${id}/summarize`, {}, { headers: getAuthHeader() });
  return response.data;
};

export const askQuestion = async (id, question) => {
  const response = await api.post(`/api/documents/${id}/ask`, { question }, { headers: getAuthHeader() });
  return response.data;
};

export const streamChat = async (id, messages, onChunk) => {
  try {
    const response = await api.post(`/api/documents/${id}/chat/stream`, 
      { messages },
      {
        responseType: 'text',
        headers: {
          ...getAuthHeader(),
          'Accept': 'text/event-stream'
        },
      }
    );

    const reader = response.data.split('\n');
    let fullResponse = '';

    for (const line of reader) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === 'bot') {
            fullResponse += data.content;
            onChunk(fullResponse);
          }
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error in streamChat:', error);
    throw error;
  }
};

// Tags
export const createTag = async (name) => {
  const response = await api.post('/api/tags', { name }, { headers: getAuthHeader() });
  return response.data;
};

export const getTags = async () => {
  const response = await api.get('/api/tags', { headers: getAuthHeader() });
  return response.data;
};

export const getTag = async (id) => {
  const response = await api.get(`/api/tags/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const updateTag = async (id, name) => {
  const response = await api.put(`/api/tags/${id}`, { name }, { headers: getAuthHeader() });
  return response.data;
};

export const deleteTag = async (id) => {
  const response = await api.delete(`/api/tags/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const addTagToDocument = async (documentId, tagId) => {
  const response = await api.post('/api/tags/addToDocument', { documentId, tagId }, { headers: getAuthHeader() });
  return response.data;
};

export const removeTagFromDocument = async (documentId, tagId) => {
  const response = await api.post('/api/tags/removeFromDocument', { documentId, tagId }, { headers: getAuthHeader() });
  return response.data;
};

export const getDocumentsByTag = async (tagId) => {
  const response = await api.get(`/api/tags/${tagId}/documents`, { headers: getAuthHeader() });
  return response.data;
};

export const searchTags = async (query) => {
  const response = await api.get(`/api/tags/search?query=${query}`, { headers: getAuthHeader() });
  return response.data;
};

// Conversations
export const createConversation = async (title) => {
  const response = await api.post('/api/conversations', { title }, { headers: getAuthHeader() });
  return response.data;
};

export const getConversations = async () => {
  const response = await api.get('/api/conversations', { headers: getAuthHeader() });
  return response.data;
};

export const getConversation = async (id) => {
  const response = await api.get(`/api/conversations/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const updateConversation = async (id, title) => {
  const response = await api.patch(`/api/conversations/${id}`, { title }, { headers: getAuthHeader() });
  return response.data;
};

export const deleteConversation = async (id) => {
  const response = await api.delete(`/api/conversations/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const addMessageToConversation = async (conversationId, content) => {
  const response = await api.post(`/api/conversations/${conversationId}/messages`, { content }, { headers: getAuthHeader() });
  return response.data;
};

// Document Types
export const createDocumentType = async (name, description) => {
  const response = await api.post('/api/document-types', { name, description }, { headers: getAuthHeader() });
  return response.data;
};

export const getDocumentTypes = async () => {
  const response = await api.get('/api/document-types', { headers: getAuthHeader() });
  return response.data;
};

export const getDocumentType = async (id) => {
  const response = await api.get(`/api/document-types/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const updateDocumentType = async (id, name, description) => {
  const response = await api.put(`/api/document-types/${id}`, { name, description }, { headers: getAuthHeader() });
  return response.data;
};

export const deleteDocumentType = async (id) => {
  const response = await api.delete(`/api/document-types/${id}`, { headers: getAuthHeader() });
  return response.data;
};

// Roles
export const createRole = async (name) => {
  const response = await api.post('/api/roles', { name }, { headers: getAuthHeader() });
  return response.data;
};

export const assignRole = async (userId, roleId) => {
  const response = await api.post('/api/roles/assign', { userId, roleId }, { headers: getAuthHeader() });
  return response.data;
};

export const getUserRoles = async (userId) => {
  const response = await api.get(`/api/roles/user/${userId}`, { headers: getAuthHeader() });
  return response.data;
};

// Search
export const searchDocuments = async (query) => {
  const response = await api.get(`/api/search?query=${query}`, { headers: getAuthHeader() });
  return response.data;
};

// Files
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/files/upload', formData, {
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getFile = async (id) => {
  const response = await api.get(`/api/files/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const deleteFile = async (id) => {
  const response = await api.delete(`/api/files/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export default api;