export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participantNames: string[];
  lastMessage?: Message;
  lastMessageTime?: Date;
  unreadCount: number;
  archived: boolean;
  createdAt: Date;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

export class MessagingService {
  private conversations: Map<string, Conversation> = new Map();
  private messages: Map<string, Message[]> = new Map();

  createConversation(participantIds: string[], participantNames: string[]): Conversation {
    const id = `conv_${Date.now()}`;
    const conversation: Conversation = {
      id,
      participantIds,
      participantNames,
      unreadCount: 0,
      archived: false,
      createdAt: new Date(),
    };
    this.conversations.set(id, conversation);
    this.messages.set(id, []);
    return conversation;
  }

  sendMessage(
    conversationId: string,
    senderId: string,
    senderName: string,
    content: string
  ): Message {
    const message: Message = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId,
      senderName,
      content,
      timestamp: new Date(),
      read: false,
    };

    const conversationMessages = this.messages.get(conversationId) || [];
    conversationMessages.push(message);
    this.messages.set(conversationId, conversationMessages);

    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.lastMessage = message;
      conversation.lastMessageTime = new Date();
    }

    return message;
  }

  getMessages(conversationId: string): Message[] {
    return this.messages.get(conversationId) || [];
  }

  getConversations(userId: string): Conversation[] {
    return Array.from(this.conversations.values()).filter((c) =>
      c.participantIds.includes(userId)
    );
  }

  markAsRead(conversationId: string, userId: string): void {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.unreadCount = 0;
    }

    const messages = this.messages.get(conversationId) || [];
    messages.forEach((msg) => {
      if (msg.senderId !== userId) {
        msg.read = true;
      }
    });
  }

  deleteConversation(conversationId: string): void {
    this.conversations.delete(conversationId);
    this.messages.delete(conversationId);
  }

  archiveConversation(conversationId: string): void {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.archived = true;
    }
  }

  searchMessages(conversationId: string, query: string): Message[] {
    const messages = this.messages.get(conversationId) || [];
    return messages.filter((msg) =>
      msg.content.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const messagingService = new MessagingService();
