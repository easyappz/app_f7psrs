import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../store/auth';
import { getMessages, sendMessage, deleteMessage } from '../api/chat';

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);
  const lastRef = useRef({ after_id: undefined, after_ts: undefined });
  const fetchingRef = useRef(false);
  const pollRef = useRef(null);

  const canDelete = useMemo(() => ['admin', 'moderator'].includes(user?.role), [user]);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  const updateLastPointers = useCallback((list) => {
    if (!list || list.length === 0) return;
    const last = list[list.length - 1];
    if (last?.id) lastRef.current.after_id = last.id;
    if (last?.created_at) lastRef.current.after_ts = last.created_at;
  }, []);

  const fetchInitial = useCallback(async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const data = await getMessages({ limit: 50 });
      setMessages(data);
      updateLastPointers(data);
      setTimeout(() => scrollToBottom(), 0);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  }, [scrollToBottom, updateLastPointers]);

  const fetchNew = useCallback(async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const { after_id, after_ts } = lastRef.current;
      const data = await getMessages({ limit: 50, after_id, after_ts });
      if (Array.isArray(data) && data.length) {
        setMessages((prev) => {
          const merged = [...prev, ...data];
          return merged;
        });
        updateLastPointers(data);
        setTimeout(() => scrollToBottom(), 0);
      }
    } catch {
      // silent
    } finally {
      fetchingRef.current = false;
    }
  }, [scrollToBottom, updateLastPointers]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  useEffect(() => {
    pollRef.current = setInterval(fetchNew, 3000);
    return () => clearInterval(pollRef.current);
  }, [fetchNew]);

  const onSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      content: input.trim(),
      created_at: new Date().toISOString(),
      author: { id: user.id, username: user.username, role: user.role },
      _optimistic: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    setInput('');
    setSending(true);
    try {
      const created = await sendMessage({ content: optimistic.content });
      setMessages((prev) => prev.map((m) => (m.id === tempId ? created : m)));
      updateLastPointers([created]);
      setTimeout(() => scrollToBottom(), 0);
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    } finally {
      setSending(false);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      // silent
    }
  };

  return (
    <section className="page" data-easytag="id1-react/src/pages/Chat.jsx">
      <div className="card p-0" data-easytag="id2-react/src/pages/Chat.jsx">
        <div className="border-b border-brand-100 px-4 py-3" data-easytag="id3-react/src/pages/Chat.jsx">
          <h1 className="text-lg font-semibold" data-easytag="id4-react/src/pages/Chat.jsx">Общий чат</h1>
        </div>
        <div className="flex h-[60vh] flex-col md:h-[70vh]" data-easytag="id5-react/src/pages/Chat.jsx">
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3" data-easytag="id6-react/src/pages/Chat.jsx">
            {loading ? (
              <div className="text-center text-sm text-brand-600" data-easytag="id7-react/src/pages/Chat.jsx">Загрузка сообщений...</div>
            ) : (
              <ul className="space-y-3" data-easytag="id8-react/src/pages/Chat.jsx">
                {messages.map((m) => (
                  <li key={m.id} className="rounded-lg border border-brand-100 bg-white p-3 shadow-soft" data-easytag="id9-react/src/pages/Chat.jsx">
                    <div className="mb-1 flex items-center justify-between" data-easytag="id10-react/src/pages/Chat.jsx">
                      <div className="text-sm text-brand-700" data-easytag="id11-react/src/pages/Chat.jsx">
                        <span className="font-medium text-brand-900" data-easytag="id12-react/src/pages/Chat.jsx">{m.author?.username}</span>
                        <span className="ml-2 text-xs text-brand-500" data-easytag="id13-react/src/pages/Chat.jsx">{new Date(m.created_at).toLocaleString()}</span>
                        {m._optimistic && (
                          <span className="ml-2 text-xs text-brand-400" data-easytag="id14-react/src/pages/Chat.jsx">отправка...</span>
                        )}
                      </div>
                      {canDelete && typeof m.id === 'number' && (
                        <button onClick={() => onDelete(m.id)} className="text-xs text-red-600 hover:text-red-700" data-easytag="id15-react/src/pages/Chat.jsx">Удалить</button>
                      )}
                    </div>
                    <div className="whitespace-pre-wrap text-[15px] text-brand-900" data-easytag="id16-react/src/pages/Chat.jsx">{m.content}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <form onSubmit={onSend} className="sticky bottom-0 flex gap-2 border-t border-brand-100 bg-white p-3" data-easytag="id17-react/src/pages/Chat.jsx">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Введите сообщение..."
              className="input min-h-[44px] flex-1 resize-none"
              rows={1}
              data-easytag="id18-react/src/pages/Chat.jsx"
            />
            <button type="submit" className="btn-primary" disabled={!input.trim() || sending} data-easytag="id19-react/src/pages/Chat.jsx">Отправить</button>
          </form>
        </div>
      </div>
    </section>
  );
}
