export const WS_CONFIG = {
  // Интервал переподключения в миллисекундах
  RECONNECT_INTERVAL: 3000,
  
  // Максимальное количество попыток переподключения
  MAX_RECONNECT_ATTEMPTS: 5,
  
  // Таймаут для операций в миллисекундах
  OPERATION_TIMEOUT: 5000,
  
  // Пути для WebSocket
  PATHS: {
    NOTIFICATIONS: '/api/notifications',
    CHAT: '/api/chat',
    EVENTS: '/api/events',
  }
} as const;

export type MessageType = 'notification' | 'chat' | 'event' | 'error' | 'ping' | 'pong';

export interface WebSocketMessage<T = unknown> {
  type: MessageType;
  payload: T;
  timestamp: number;
};
