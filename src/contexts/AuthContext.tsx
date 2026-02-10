import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '@/types';
import { users } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (data: { email: string; password: string; name: string; role: Role }) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('eventplatform_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('eventplatform_user');
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password' };
    setUser(found);
    localStorage.setItem('eventplatform_user', JSON.stringify(found));
    return { success: true };
  };

  const signup = (data: { email: string; password: string; name: string; role: Role }) => {
    const exists = users.find(u => u.email === data.email);
    if (exists) return { success: false, error: 'Email already registered' };
    const newUser: User = {
      id: `u${Date.now()}`,
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
    };
    users.push(newUser);
    setUser(newUser);
    localStorage.setItem('eventplatform_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventplatform_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
