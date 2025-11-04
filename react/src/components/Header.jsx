import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b border-brand-200 bg-white" data-easytag="id1-react/src/components/Header.jsx">
      <div className="page flex items-center justify-between py-4" data-easytag="id2-react/src/components/Header.jsx">
        <div className="flex items-center gap-3" data-easytag="id3-react/src/components/Header.jsx">
          <Link to="/" className="text-lg font-semibold text-brand-900" data-easytag="id4-react/src/components/Header.jsx">Easyappz Chat</Link>
        </div>
        <nav className="flex items-center gap-2" data-easytag="id5-react/src/components/Header.jsx">
          <Link to="/" className="btn-secondary" data-easytag="id6-react/src/components/Header.jsx">Домой</Link>
          <Link to="/chat" className="btn-secondary" data-easytag="id7-react/src/components/Header.jsx">Чат</Link>
          {!user && (
            <>
              <Link to="/login" className="btn-primary" data-easytag="id8-react/src/components/Header.jsx">Войти</Link>
              <Link to="/register" className="btn-secondary" data-easytag="id9-react/src/components/Header.jsx">Регистрация</Link>
            </>
          )}
          {user && (
            <div className="flex items-center gap-3" data-easytag="id10-react/src/components/Header.jsx">
              <span className="text-sm text-brand-600" data-easytag="id11-react/src/components/Header.jsx">{user.username} · {user.role}</span>
              <button onClick={handleLogout} className="btn-primary" data-easytag="id12-react/src/components/Header.jsx">Выход</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
