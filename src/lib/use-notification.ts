import { useNotifications } from './notifications-context';

export function useNotification() {
  const { addNotification } = useNotifications();

  return {
    info: (title: string, message: string) =>
      addNotification({ title, message, type: 'info' }),
    success: (title: string, message: string) =>
      addNotification({ title, message, type: 'success' }),
    warning: (title: string, message: string) =>
      addNotification({ title, message, type: 'warning' }),
    error: (title: string, message: string) =>
      addNotification({ title, message, type: 'error' }),
  };
}
