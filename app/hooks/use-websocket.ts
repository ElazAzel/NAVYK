import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/context/auth-context';

export function useWebSocket(url: string) {
  const { user } = useAuth();
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (!user?.id) return;

    const wsUrl = `${url}?userId=${user.id}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket подключение установлено');
    };

    ws.current.onclose = () => {
      console.log('WebSocket подключение закрыто');
      // Пытаемся переподключиться через 3 секунды
      setTimeout(connect, 3000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket ошибка:', error);
    };
  }, [url, user?.id]);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  return { sendMessage };
}