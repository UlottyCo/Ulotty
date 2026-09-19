'use client';

import { Conversation } from '@/lib/messaging';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">💬 Mensajes</h3>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-muted text-sm">
            No hay conversaciones
          </div>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full text-left p-4 border-b border-border hover:bg-background transition ${
                selectedId === conv.id ? 'bg-background' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-semibold text-sm">
                  {conv.participantNames.join(', ')}
                </p>
                {conv.unreadCount > 0 && (
                  <span className="px-2 py-1 bg-brand text-brand-foreground text-xs rounded-full">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted truncate">
                {conv.lastMessage?.content || 'Sin mensajes'}
              </p>
              {conv.lastMessageTime && (
                <p className="text-xs text-muted mt-1">
                  {new Date(conv.lastMessageTime).toLocaleDateString('es-MX')}
                </p>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
