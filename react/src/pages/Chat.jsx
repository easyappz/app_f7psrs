import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listMessages, createMessage, removeMessage } from '../api/chat';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';

const Chat = () => {
  const queryClient = useQueryClient();
  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['chat', 'messages'],
    queryFn: () => listMessages({ limit: 50 }),
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
  });

  const createMut = useMutation({
    mutationFn: (content) => createMessage({ content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'messages'] });
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id) => removeMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'messages'] });
    },
  });

  const canDelete = user?.role === 'admin' || user?.role === 'moderator';

  return (
    <div className="page" data-easytag="id1-react/src/pages/Chat.jsx">
      <div className="mx-auto mt-6 flex h-[70vh] max-w-3xl flex-col rounded-xl border border-brand-100 bg-white p-4 shadow-soft" data-easytag="id2-react/src/pages/Chat.jsx">
        <div className="mb-2 flex items-center justify-between" data-easytag="id3-react/src/pages/Chat.jsx">
          <h2 className="text-lg font-semibold text-brand-800" data-easytag="id4-react/src/pages/Chat.jsx">Общий чат</h2>
          <div className="text-xs text-brand-500" data-easytag="id5-react/src/pages/Chat.jsx">{isFetching ? 'Обновление…' : 'Онлайн'}</div>
        </div>

        {isError && (
          <div className="mb-2 rounded-md bg-yellow-50 px-3 py-2 text-xs text-yellow-800" data-easytag="id6-react/src/pages/Chat.jsx">Не удалось загрузить сообщения</div>
        )}

        <MessageList messages={data || []} canDelete={canDelete} onDelete={(id) => deleteMut.mutate(id)} />

        <MessageInput onSend={(text) => createMut.mutateAsync(text)} isLoading={createMut.isPending} />
      </div>
    </div>
  );
};

export default Chat;
