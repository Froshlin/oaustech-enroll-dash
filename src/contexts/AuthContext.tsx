// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'student' | 'admin';
  studentId?: string;
  department?: string;
  level?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'student' | 'admin') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('oaustech_user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Clear any existing timeout on refresh
      const timeoutId = localStorage.getItem('logoutTimeoutId');
      if (timeoutId) {
        clearTimeout(parseInt(timeoutId));
      }
      // Set new 1-hour timeout
      const newTimeoutId = setTimeout(logout, 3600000);
      localStorage.setItem('logoutTimeoutId', newTimeoutId.toString());
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, role: 'student' | 'admin'): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/auth/login`, {
        username,
        password,
      });

      const { _id, username: userUsername, role: userRole, token } = response.data;
      const userData: User = {
        id: _id,
        username: userUsername,
        name: '',
        role: userRole,
        studentId: role === 'student' ? username : undefined,
        department: '',
        level: '',
      };

      setUser(userData);
      localStorage.setItem('oaustech_user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const timeoutId = setTimeout(logout, 3600000);
      localStorage.setItem('logoutTimeoutId', timeoutId.toString());

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oaustech_user');
    localStorage.removeItem('token');
    const timeoutId = localStorage.getItem('logoutTimeoutId');
    if (timeoutId) {
      clearTimeout(parseInt(timeoutId));
      localStorage.removeItem('logoutTimeoutId');
    }
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};