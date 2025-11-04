import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { me } from '../api/auth';

const ProtectedRoute = ({ children }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { isFetching, isError } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: me,
    enabled: !!token,
    retry: 1,
    staleTime: 60_000,
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isFetching) {
    return (
      <div className="page" data-easytag="id1-react/src/components/ProtectedRoute.jsx">
        <div className="mt-16 text-center text-brand-600" data-easytag="id2-react/src/components/ProtectedRoute.jsx">Загрузка...</div>
      </div>
    );
  }

  if (isError) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
