import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../api/auth';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.username.trim()) return 'Введите имя пользователя';
    if (!form.password.trim() || form.password.trim().length < 1) return 'Введите пароль';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    try {
      setLoading(true);
      const data = await registerApi({ username: form.username.trim(), password: form.password, email: form.email.trim() || undefined });
      localStorage.setItem('token', data.access);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/chat');
    } catch (err) {
      setError('Не удалось зарегистрироваться. Имя может быть занято.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" data-easytag="id1-react/src/pages/Register.jsx">
      <div className="mx-auto mt-12 max-w-md card" data-easytag="id2-react/src/pages/Register.jsx">
        <h2 className="text-xl font-semibold text-brand-900" data-easytag="id3-react/src/pages/Register.jsx">Регистрация</h2>
        <form className="mt-6 space-y-4" onSubmit={onSubmit} data-easytag="id4-react/src/pages/Register.jsx">
          <div data-easytag="id5-react/src/pages/Register.jsx">
            <label className="mb-1 block text-sm text-brand-700" htmlFor="username" data-easytag="id6-react/src/pages/Register.jsx">Имя пользователя</label>
            <input id="username" name="username" type="text" className="input" placeholder="Введите имя пользователя" value={form.username} onChange={onChange} data-easytag="id7-react/src/pages/Register.jsx" />
          </div>
          <div data-easytag="id8-react/src/pages/Register.jsx">
            <label className="mb-1 block text-sm text-brand-700" htmlFor="password" data-easytag="id9-react/src/pages/Register.jsx">Пароль</label>
            <input id="password" name="password" type="password" className="input" placeholder="Введите пароль" value={form.password} onChange={onChange} data-easytag="id10-react/src/pages/Register.jsx" />
          </div>
          <div data-easytag="id11-react/src/pages/Register.jsx">
            <label className="mb-1 block text-sm text-brand-700" htmlFor="email" data-easytag="id12-react/src/pages/Register.jsx">Email (необязательно)</label>
            <input id="email" name="email" type="email" className="input" placeholder="email@example.com" value={form.email} onChange={onChange} data-easytag="id13-react/src/pages/Register.jsx" />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" data-easytag="id14-react/src/pages/Register.jsx">{error}</div>
          )}

          <button type="submit" className="btn-primary w-full" disabled={loading} data-easytag="id15-react/src/pages/Register.jsx">Создать аккаунт</button>
          <p className="text-center text-sm text-brand-600" data-easytag="id16-react/src/pages/Register.jsx">
            Уже есть аккаунт? <Link to="/login" className="text-brand-700 underline hover:text-brand-900" data-easytag="id17-react/src/pages/Register.jsx">Войти</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
