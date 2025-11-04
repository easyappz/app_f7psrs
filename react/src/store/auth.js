import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, register as apiRegister, me as apiMe } from '../api/auth';

const AuthContext = createContext(null);

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(!!token);

  const saveAuth = useCallback((newToken, newUser) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
    }
    if (newUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      setUser(newUser);
    }
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const me = await apiMe();
        if (!cancelled) {
          saveAuth(token, me);
        }
      } catch (e) {
        if (!cancelled) clearAuth();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    init();
    return () => {
      cancelled = true;
    };
  }, [token, saveAuth, clearAuth]);

  const login = useCallback(async ({ username, password }) => {
    const data = await apiLogin({ username, password });
    saveAuth(data.access, data.user);
    return data;
  }, [saveAuth]);

  const register = useCallback(async ({ username, password, email }) => {
    const data = await apiRegister({ username, password, email });
    saveAuth(data.access, data.user);
    return data;
  }, [saveAuth]);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const value = useMemo(() => ({ token, user, loading, login, register, logout }), [token, user, loading, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
