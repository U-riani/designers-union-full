// context/LocalStorageContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the LocalStorage context
const LocalStorageContext = createContext();

// Helper function to load data from localStorage
const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.error("Failed to load data from localStorage", error);
    return undefined;
  }
};

// Helper function to save data to localStorage
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save data to localStorage", error);
  }
};

// Create a provider component
export const LocalStorageProvider = ({ children }) => {
  const [localStorageData, setLocalStorageData] = useState({
    allNews: loadFromLocalStorage('allNews'),
    allDesigners: loadFromLocalStorage('allDesigners'),
    allHeros: loadFromLocalStorage('allHeros'),
    allPartners: loadFromLocalStorage('allPartners'),
    allProjects: loadFromLocalStorage('allProjects'),
    allPprojectsPage: loadFromLocalStorage('allProjectsPage'),
    aboutUs: loadFromLocalStorage('aboutUs'),
    aboutUsMainPage: loadFromLocalStorage('aboutUsMainPage'),
    allBlogs: loadFromLocalStorage('allBlogs'),
    allTeamMembers: loadFromLocalStorage('allTeamMembers'),
  });

  // Function to update localStorage data
  const updateLocalStorageData = (key, value) => {
    saveToLocalStorage(key, value);
    setLocalStorageData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <LocalStorageContext.Provider value={{ localStorageData, updateLocalStorageData }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

// Custom hook to use the LocalStorageContext
export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error("useLocalStorage must be used within a LocalStorageProvider");
  }
  return context;
};
