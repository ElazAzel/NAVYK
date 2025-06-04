import { useEffect, useRef, useCallback, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { WS_CONFIG, WebSocketMessage, MessageType } from '@/app/lib/websocket-config';

interface WebSocketState {
  isConnected: boolean;
  error: Error | null;
  reconnectAttempts: number;
}

interface WebSocketHook {
  isConnected: boolean;
  error: Error | null;
  sendMessage: <T>(type: MessageType, payload: T) => void;
}

export function useWebSocket(url: string) {
  const { user } = useAuth();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const [state, setState] = useState<WebSocketState>({
    isConnected: false,
    error: null,
    reconnectAttempts: 0
  });

  const cleanup = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = undefined;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isConnected: false,
      reconnectAttempts: 0
    }));
  }, []);

  const connect = useCallback(() => {
    try {
      if (!user?.id) {
        throw new Error('Пользователь не авторизован');
      }

      if (state.reconnectAttempts >= WS_CONFIG.MAX_RECONNECT_ATTEMPTS) {
        throw new Error('Превышено максимальное количество попыток подключения');
      }

      cleanup();

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const baseUrl = url.startsWith('ws') ? url : `${protocol}//${window.location.host}${url}`;
      const wsUrl = `${baseUrl}?userId=${user.id}`;

      const socket = new WebSocket(wsUrl);
      let pingInterval: NodeJS.Timeout;

      socket.onopen = () => {
        setState(prev => ({
          ...prev,
          isConnected: true,
          error: null,
          reconnectAttempts: 0
        }));
        console.log('WebSocket подключение установлено');

        // Отправляем пинг каждые 30 секунд для поддержания соединения
        pingInterval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000);
      };

      socket.onclose = (event) => {
        clearInterval(pingInterval);
        setState(prev => ({
          ...prev,
          isConnected: false,
          reconnectAttempts: prev.reconnectAttempts + 1
        }));
        
        console.log('WebSocket подключение закрыто:', event.code, event.reason);
        
        // Пытаемся переподключиться только если соединение было разорвано не намеренно
        // и не превышено максимальное количество попыток
        if (event.code !== 1000 && state.reconnectAttempts < WS_CONFIG.MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeoutRef.current = setTimeout(connect, WS_CONFIG.RECONNECT_INTERVAL);
        }
      };

      socket.onerror = (error) => {
        const wsError = error instanceof Error ? error : new Error('Ошибка WebSocket соединения');
        setState(prev => ({
          ...prev,
          error: wsError
        }));
        console.error('WebSocket ошибка:', wsError);
      };

      socket.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          
          // Игнорируем pong сообщения в логах
          if (message.type !== 'pong') {
            console.log('Получено сообщение:', message);
          }

          // Отвечаем на пинг
          if (message.type === 'ping') {
            socket.send(JSON.stringify({ type: 'pong' }));
          }
        } catch (err) {
          console.error('Ошибка при обработке сообщения:', err);
        }
      };

      wsRef.current = socket;
    } catch (error) {
      const wsError = error instanceof Error ? error : new Error('Ошибка при создании WebSocket');
      setState(prev => ({
        ...prev,
        error: wsError,
        isConnected: false
      }));
      console.error('Ошибка при создании WebSocket:', wsError);
      
      // Пробуем переподключиться при ошибке, если не превышен лимит попыток
      if (state.reconnectAttempts < WS_CONFIG.MAX_RECONNECT_ATTEMPTS) {
        reconnectTimeoutRef.current = setTimeout(connect, WS_CONFIG.RECONNECT_INTERVAL);
      }
    }
  }, [url, user?.id, cleanup, state.reconnectAttempts]);

  useEffect(() => {
    // Подключаемся только если есть user.id
    if (user?.id) {
      connect();
    }
    return cleanup;
  }, [connect, cleanup, user?.id]);

  const sendMessage = useCallback(<T>(type: MessageType, payload: T) => {
    if (!wsRef.current || !state.isConnected) {
      console.error('WebSocket не подключен');
      return;
    }

    const message: WebSocketMessage<T> = {
      type,
      payload,
      timestamp: Date.now()
    };

    wsRef.current.send(JSON.stringify(message));
  }, [state.isConnected]);

  return {
    isConnected: state.isConnected,
    error: state.error,
    sendMessage
  };
}