import instance from './axios';

export async function listMessages(params = {}) {
  const res = await instance.get('/api/chat/messages/', { params });
  return res.data;
}

export async function createMessage({ content }) {
  const res = await instance.post('/api/chat/messages/', { content });
  return res.data;
}

export async function removeMessage(id) {
  const res = await instance.delete(`/api/chat/messages/${id}/`);
  return res.data;
}
