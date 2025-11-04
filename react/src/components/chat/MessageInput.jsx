import React, { useState } from 'react';

const MessageInput = ({ onSend, isLoading }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Введите сообщение');
      return;
    }
    setError('');
    onSend(trimmed).then(() => setValue('')).catch((e) => {
      setError('Не удалось отправить сообщение');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex items-end gap-2" data-easytag="id1-react/src/components/chat/MessageInput.jsx">
      <div className="flex-1" data-easytag="id2-react/src/components/chat/MessageInput.jsx">
        <label className="sr-only" data-easytag="id3-react/src/components/chat/MessageInput.jsx">Сообщение</label>
        <textarea
          className="input h-24 resize-none"
          placeholder="Напишите сообщение..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-easytag="id4-react/src/components/chat/MessageInput.jsx"
        />
        {error && (
          <div className="mt-1 text-xs text-red-600" data-easytag="id5-react/src/components/chat/MessageInput.jsx">{error}</div>
        )}
      </div>
      <button type="submit" className="btn-primary h-10 px-5" disabled={isLoading} data-easytag="id6-react/src/components/chat/MessageInput.jsx">Отправить</button>
    </form>
  );
};

export default MessageInput;
