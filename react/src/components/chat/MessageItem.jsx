import React from 'react';

const MessageItem = ({ message, canDelete, onDelete }) => {
  const created = new Date(message.created_at);
  const time = created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <li className="flex items-start gap-3 px-3 py-2 hover:bg-brand-50 rounded-lg" data-easytag="id1-react/src/components/chat/MessageItem.jsx">
      <div className="h-9 w-9 shrink-0 rounded-full bg-brand-200" data-easytag="id2-react/src/components/chat/MessageItem.jsx" />
      <div className="flex-1" data-easytag="id3-react/src/components/chat/MessageItem.jsx">
        <div className="flex items-center gap-2" data-easytag="id4-react/src/components/chat/MessageItem.jsx">
          <span className="text-sm font-medium text-brand-800" data-easytag="id5-react/src/components/chat/MessageItem.jsx">{message.author?.username}</span>
          <span className="text-xs text-brand-400" data-easytag="id6-react/src/components/chat/MessageItem.jsx">{time}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm text-brand-900" data-easytag="id7-react/src/components/chat/MessageItem.jsx">{message.content}</p>
      </div>
      {canDelete && (
        <button onClick={() => onDelete(message.id)} className="ml-2 rounded-md px-2 py-1 text-xs text-red-600 hover:bg-red-50" title="Удалить" data-easytag="id8-react/src/components/chat/MessageItem.jsx">
          Удалить
        </button>
      )}
    </li>
  );
};

export default MessageItem;
