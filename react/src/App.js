import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './ErrorBoundary';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './store/auth';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import './index.css';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const routes = ['/', '/register', '/login', '/chat', '*'];
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      try {
        window.handleRoutes(routes);
      } catch (e) {
        // silent
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen bg-brand-50 text-brand-900" data-easytag="id1-react/src/App.js">
              <Header />
              <main className="page py-8" data-easytag="id2-react/src/App.js">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/chat"
                    element={
                      <ProtectedRoute>
                        <Chat />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
