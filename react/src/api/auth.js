import instance from './axios';

export async function register(payload) {
  const res = await instance.post('/api/auth/register/', payload);
  return res.data;
}

export async function login(payload) {
  const res = await instance.post('/api/auth/login/', payload);
  return res.data;
}

export async function me() {
  const res = await instance.get('/api/auth/me/');
  if (res?.data) {
    try { localStorage.setItem('user', JSON.stringify(res.data)); } catch (e) {}
  }
  return res.data;
}
