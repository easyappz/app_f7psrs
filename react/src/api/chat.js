import instance from './axios';

// Chat API strictly per api_schema.yaml
export const getMessages = async ({ limit, after_id, after_ts } = {}) => {
  const params = {};
  if (typeof limit === 'number') params.limit = limit;
  if (typeof after_id === 'number') params.after_id = after_id;
  if (after_ts) params.after_ts = after_ts;
  const res = await instance.get('/api/chat/messages/', { params });
  return res.data; // array of ChatMessage
};

export const sendMessage = async ({ content }) => {
  const res = await instance.post('/api/chat/messages/', { content });
  return res.data; // ChatMessage
};

export const deleteMessage = async (id) => {
  await instance.delete(`/api/chat/messages/${id}/`);
  return true;
};
