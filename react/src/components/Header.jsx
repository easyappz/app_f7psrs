import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }, [location.pathname]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="border-b border-brand-100 bg-white" data-easytag="id1-react/src/components/Header.jsx">
      <div className="page flex h-16 items-center justify-between" data-easytag="id2-react/src/components/Header.jsx">
        <div className="flex items-center gap-3" data-easytag="id3-react/src/components/Header.jsx">
          <Link to="/" className="text-lg font-semibold text-brand-800 hover:text-brand-900" data-easytag="id4-react/src/components/Header.jsx">Easyappz Чат</Link>
          <span className="hidden sm:inline text-xs text-brand-400" data-easytag="id5-react/src/components/Header.jsx">минималистичный групповой чат</span>
        </div>
        <nav className="flex items-center gap-3" data-easytag="id6-react/src/components/Header.jsx">
          {!token && (
            <>
              <Link to="/login" className="btn-secondary" data-easytag="id7-react/src/components/Header.jsx">Войти</Link>
              <Link to="/register" className="btn-primary" data-easytag="id8-react/src/components/Header.jsx">Регистрация</Link>
            </>
          )}
          {token && (
            <div className="flex items-center gap-3" data-easytag="id9-react/src/components/Header.jsx">
              <Link to="/chat" className="btn-secondary" data-easytag="id10-react/src/components/Header.jsx">Чат</Link>
              <div className="hidden sm:flex items-center gap-2 text-sm text-brand-600" data-easytag="id11-react/src/components/Header.jsx">
                <span data-easytag="id12-react/src/components/Header.jsx">{user?.username || 'Пользователь'}</span>
                <span className="rounded bg-brand-100 px-2 py-0.5 text-xs" data-easytag="id13-react/src/components/Header.jsx">{user?.role || 'user'}</span>
              </div>
              <button onClick={handleLogout} className="btn-primary" data-easytag="id14-react/src/components/Header.jsx">Выйти</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
