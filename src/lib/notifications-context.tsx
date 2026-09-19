'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simular notificaciones en tiempo real
    const interval = setInterval(() => {
      // 30% de probabilidad de nueva notificación cada 30 segundos
      if (Math.random() < 0.3) {
        const mockNotifications = [
          { title: '📊 Nuevo usuario registrado', message: 'Juan Pérez se acaba de registrar en Ulotty' },
          { title: '🏠 Nueva propiedad publicada', message: 'Se publicó un apartamento en Centro por $250,000' },
          { title: '💰 Operación completada', message: 'Se completó una venta por $350,000' },
          { title: '⚠️ Sistema en mantenimiento', message: 'Backup automático en progreso' },
          { title: '✅ Pagos procesados', message: 'Se pagaron comisiones a 5 agentes' },
        ];
        
        const random = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
        addNotification({
          title: random.title,
          message: random.message,
          type: ['success', 'info', 'warning', 'error'][Math.floor(Math.random() * 4)] as any,
        });
      }
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications((prev) => [newNotification, ...prev].slice(0, 50));

    // Auto-remove después de 5 minutos
    setTimeout(() => {
      deleteNotification(id);
    }, 5 * 60 * 1000);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
