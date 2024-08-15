'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDocuments, getConversations } from '../utils/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [documents, setDocuments] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [docsData, convsData] = await Promise.all([
        getDocuments(),
        getConversations()
      ]);
      setDocuments(docsData);
      setConversations(convsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ documents, setDocuments, conversations, setConversations, loading, fetchData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}