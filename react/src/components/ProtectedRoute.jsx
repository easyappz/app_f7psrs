import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page py-20" data-easytag="id1-react/src/components/ProtectedRoute.jsx">
        <div className="mx-auto max-w-sm text-center" data-easytag="id2-react/src/components/ProtectedRoute.jsx">
          <div className="card" data-easytag="id3-react/src/components/ProtectedRoute.jsx">
            <div className="animate-pulse text-sm text-brand-600" data-easytag="id4-react/src/components/ProtectedRoute.jsx">Загрузка...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
