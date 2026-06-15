import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    id: 'user-admin',
    name: 'Admin Manager',
    email: 'admin@rentease.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 99001 88234',
    city: 'Bangalore'
  },
  {
    id: 'user-renter',
    name: 'Alex Johnson',
    email: 'user@example.com',
    password: 'user123',
    role: 'renter',
    phone: '+91 98765 43210',
    city: 'Bangalore'
  }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('rentease_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('rentease_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('rentease_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rentease_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rentease_current_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const signup = (name, email, password, role = 'renter', phone = '', city = 'Bangalore') => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role,
      phone,
      city
    };
    setUsers(prev => [...prev, newUser]);
    // Log the user in automatically if they are a renter
    if (role === 'renter') {
      setCurrentUser(newUser);
    }
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
