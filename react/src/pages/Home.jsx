import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Home() {
  const { user } = useAuth();
  return (
    <section className="page" data-easytag="id1-react/src/pages/Home.jsx">
      <div className="grid gap-6 md:grid-cols-2" data-easytag="id2-react/src/pages/Home.jsx">
        <div className="card" data-easytag="id3-react/src/pages/Home.jsx">
          <h1 className="mb-2 text-2xl font-semibold" data-easytag="id4-react/src/pages/Home.jsx">Групповой чат</h1>
          <p className="mb-4 text-sm text-brand-700" data-easytag="id5-react/src/pages/Home.jsx">Общий чат для всех зарегистрированных пользователей. Минималистичный интерфейс, удобный ввод и управление.</p>
          <div className="flex gap-2" data-easytag="id6-react/src/pages/Home.jsx">
            <Link to="/chat" className="btn-primary" data-easytag="id7-react/src/pages/Home.jsx">Перейти в чат</Link>
            {!user && (
              <>
                <Link to="/login" className="btn-secondary" data-easytag="id8-react/src/pages/Home.jsx">Войти</Link>
                <Link to="/register" className="btn-secondary" data-easytag="id9-react/src/pages/Home.jsx">Регистрация</Link>
              </>
            )}
          </div>
        </div>
        <div className="card" data-easytag="id10-react/src/pages/Home.jsx">
          <h2 className="mb-2 text-xl font-semibold" data-easytag="id11-react/src/pages/Home.jsx">Роли в чате</h2>
          <ul className="list-disc pl-5 text-sm text-brand-700" data-easytag="id12-react/src/pages/Home.jsx">
            <li data-easytag="id13-react/src/pages/Home.jsx">Пользователь: может читать и отправлять сообщения</li>
            <li data-easytag="id14-react/src/pages/Home.jsx">Модератор/Администратор: дополнительно может удалять сообщения</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
