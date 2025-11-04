import instance from './axios';

// Auth API strictly per api_schema.yaml
export const register = async (data) => {
  // data: { username: string, password: string, email?: string }
  const res = await instance.post('/api/auth/register/', data);
  return res.data; // { access, refresh, user }
};

export const login = async (data) => {
  // data: { username: string, password: string }
  const res = await instance.post('/api/auth/login/', data);
  return res.data; // { access, refresh, user }
};

export const me = async () => {
  const res = await instance.get('/api/auth/me/');
  return res.data; // user object
};
