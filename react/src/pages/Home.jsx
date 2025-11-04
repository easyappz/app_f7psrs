import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page" data-easytag="id1-react/src/pages/Home.jsx">
      <section className="mx-auto mt-16 max-w-3xl text-center" data-easytag="id2-react/src/pages/Home.jsx">
        <h1 className="text-3xl font-semibold text-brand-900 sm:text-4xl" data-easytag="id3-react/src/pages/Home.jsx">Групповой чат Easyappz</h1>
        <p className="mt-4 text-brand-600" data-easytag="id4-react/src/pages/Home.jsx">
          Общайтесь в одном общем чате. Только для зарегистрированных пользователей. Минималистично, быстро, удобно.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" data-easytag="id5-react/src/pages/Home.jsx">
          <button className="btn-primary" onClick={() => navigate('/register')} data-easytag="id6-react/src/pages/Home.jsx">Зарегистрироваться</button>
          <button className="btn-secondary" onClick={() => navigate('/login')} data-easytag="id7-react/src/pages/Home.jsx">Войти</button>
          <button className="btn-secondary" onClick={() => navigate('/chat')} data-easytag="id8-react/src/pages/Home.jsx">Перейти в чат</button>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3" data-easytag="id9-react/src/pages/Home.jsx">
        <div className="card" data-easytag="id10-react/src/pages/Home.jsx">
          <h3 className="text-base font-medium text-brand-800" data-easytag="id11-react/src/pages/Home.jsx">Просто</h3>
          <p className="mt-2 text-sm text-brand-600" data-easytag="id12-react/src/pages/Home.jsx">Регистрация без подтверждений. Сразу заходите и общайтесь.</p>
        </div>
        <div className="card" data-easytag="id13-react/src/pages/Home.jsx">
          <h3 className="text-base font-medium text-brand-800" data-easytag="id14-react/src/pages/Home.jsx">Без UI‑китов</h3>
          <p className="mt-2 text-sm text-brand-600" data-easytag="id15-react/src/pages/Home.jsx">Самобытный минималистичный дизайн на Tailwind.</p>
        </div>
        <div className="card" data-easytag="id16-react/src/pages/Home.jsx">
          <h3 className="text-base font-medium text-brand-800" data-easytag="id17-react/src/pages/Home.jsx">Роли</h3>
          <p className="mt-2 text-sm text-brand-600" data-easytag="id18-react/src/pages/Home.jsx">Администраторы и модераторы могут удалять сообщения.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
