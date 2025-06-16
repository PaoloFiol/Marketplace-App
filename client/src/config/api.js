const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getApiUrl = () => API_URL;

export const getApiEndpoint = (endpoint) => `${API_URL}${endpoint}`; 