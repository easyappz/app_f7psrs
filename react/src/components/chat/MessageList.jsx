import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages, canDelete, onDelete }) => {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ul className="flex-1 overflow-y-auto space-y-1" data-easytag="id1-react/src/components/chat/MessageList.jsx">
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} canDelete={canDelete} onDelete={onDelete} />
      ))}
      <li ref={endRef} data-easytag="id2-react/src/components/chat/MessageList.jsx" />
    </ul>
  );
};

export default MessageList;
