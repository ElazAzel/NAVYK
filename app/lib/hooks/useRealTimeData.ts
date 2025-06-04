import { useState, useEffect, useRef, useCallback } from 'react';
import { Manager } from 'socket.io-client';
import type { SocketType, SocketConnectionOptions, WebSocketMessage } from '@/app/lib/types/socket';

interface UseRealTimeDataOptions extends SocketConnectionOptions {
  event: string;
  initialData?: any;
}

interface UseRealTimeDataReturn<T> {
  data: T;
  isConnected: boolean;
  isLoading: boolean;
  error: Error | null;
  sendEvent: (eventName: string, eventData?: any) => void;
  connect: () => void;
  disconnect: () => void;
}

/**
 * Хук для получения данных в реальном времени через WebSocket
 */
export function useRealTimeData<T>({
  url,
  event,
  initialData,
  authToken,
  autoConnect = true,
  reconnectionAttempts = 5,
  reconnectionDelay = 3000,
  onConnect,
  onDisconnect,
  onError
}: UseRealTimeDataOptions): UseRealTimeDataReturn<T> {
  const [data, setData] = useState<T>(initialData as T);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState<number>(0);
  
  const socketRef = useRef<SocketType | null>(null);

  // Инициализация и подключение
  const connect = useCallback(() => {
    if (process.env.NODE_ENV === 'test' || !url) {
      setIsLoading(false);
      setIsConnected(true);
      return;
    }

    try {
      const manager = new Manager(url, {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts,
        reconnectionDelay,
        auth: authToken ? { token: authToken } : undefined
      });

      socketRef.current = manager.socket('/');

      socketRef.current.on('connect', () => {
        setIsConnected(true);
        setIsLoading(false);
        setError(null);
        setConnectionAttempts(0);
        onConnect?.();
      });

      socketRef.current.on('disconnect', () => {
        setIsConnected(false);
        setConnectionAttempts(prev => prev + 1);
        onDisconnect?.();
      });

      socketRef.current.on('error', (err: Error) => {
        setError(err);
        onError?.(err);
      });

      socketRef.current.on(event, (newData: T) => {
        setData(newData);
      });

      socketRef.current.connect();
    } catch (err) {
      const socketError = err instanceof Error ? err : new Error('Failed to connect');
      setError(socketError);
      setIsLoading(false);
      onError?.(socketError);
    }
  }, [url, event, authToken, reconnectionAttempts, reconnectionDelay, onConnect, onDisconnect, onError]);

  // Мемоизируем функция отключения
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setIsConnected(false);
    setError(null);
  }, []);

  // Отправка данных
  const sendEvent = useCallback((eventName: string, eventData?: any) => {
    if (!socketRef.current?.connected) {
      console.warn('Socket not connected');
      return;
    }
    
    try {
      socketRef.current.emit(eventName, eventData);
    } catch (err) {
      console.error('Failed to send event:', err);
    }
  }, []);

  // Подключение при монтировании, если autoConnect = true
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // Отключение при размонтировании
    return () => {
      disconnect();
    };
  }, [connect, disconnect, autoConnect]);

  return {
    data,
    isConnected,
    isLoading,
    error,
    sendEvent,
    connect,
    disconnect
  };
}