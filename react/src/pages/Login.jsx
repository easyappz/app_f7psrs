import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.username || form.username.length < 3) return 'Имя пользователя должно быть не короче 3 символов';
    if (!form.password || form.password.length < 6) return 'Пароль должен быть не короче 6 символов';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login({ username: form.username, password: form.password });
      navigate('/chat');
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.response?.data?.message || 'Ошибка входа';
      setError(typeof msg === 'string' ? msg : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page" data-easytag="id1-react/src/pages/Login.jsx">
      <div className="mx-auto max-w-md" data-easytag="id2-react/src/pages/Login.jsx">
        <div className="card" data-easytag="id3-react/src/pages/Login.jsx">
          <h1 className="mb-4 text-2xl font-semibold" data-easytag="id4-react/src/pages/Login.jsx">Вход</h1>
          <form onSubmit={onSubmit} className="space-y-4" data-easytag="id5-react/src/pages/Login.jsx">
            <div data-easytag="id6-react/src/pages/Login.jsx">
              <label className="mb-1 block text-sm" htmlFor="username" data-easytag="id7-react/src/pages/Login.jsx">Имя пользователя</label>
              <input id="username" name="username" className="input" value={form.username} onChange={onChange} placeholder="Введите имя" data-easytag="id8-react/src/pages/Login.jsx" />
            </div>
            <div data-easytag="id9-react/src/pages/Login.jsx">
              <label className="mb-1 block text-sm" htmlFor="password" data-easytag="id10-react/src/pages/Login.jsx">Пароль</label>
              <input id="password" name="password" type="password" className="input" value={form.password} onChange={onChange} placeholder="Введите пароль" data-easytag="id11-react/src/pages/Login.jsx" />
            </div>
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" data-easytag="id12-react/src/pages/Login.jsx">{error}</div>
            )}
            <button type="submit" className="btn-primary w-full" disabled={loading} data-easytag="id13-react/src/pages/Login.jsx">{loading ? 'Входим...' : 'Войти'}</button>
          </form>
          <p className="mt-4 text-center text-sm text-brand-700" data-easytag="id14-react/src/pages/Login.jsx">
            Нет аккаунта? <Link to="/register" className="text-brand-900 underline" data-easytag="id15-react/src/pages/Login.jsx">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
