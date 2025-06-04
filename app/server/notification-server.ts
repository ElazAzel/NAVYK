import { WebSocketServer, WebSocket } from 'ws';
import { parse } from 'url';
import { WS_CONFIG } from '@/app/lib/websocket-config';

interface NotificationMessage {
  type: 'recommendation' | 'event' | 'deadline' | 'update' | 'ping' | 'pong';
  title?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  userId?: string;
  timestamp?: number;
}

const wss = new WebSocketServer({ 
  noServer: true,
  clientTracking: true,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    concurrencyLimit: 10,
    threshold: 1024
  }
});

// Хранилище подключений с привязкой к userId
const connections = new Map<string, Set<WebSocket>>();

// Очередь сообщений для повторной отправки
const messageQueue = new Map<string, NotificationMessage[]>();

// Функция для сохранения сообщения в очередь
function queueMessage(userId: string, message: NotificationMessage) {
  if (!messageQueue.has(userId)) {
    messageQueue.set(userId, []);
  }
  messageQueue.get(userId)?.push(message);
}

// Функция для отправки сообщений из очереди
function sendQueuedMessages(userId: string, ws: WebSocket) {
  const messages = messageQueue.get(userId);
  if (messages && messages.length > 0) {
    messages.forEach(message => {
      try {
        ws.send(JSON.stringify(message));
      } catch (error) {
        console.error('Ошибка при отправке сообщения из очереди:', error);
      }
    });
    messageQueue.delete(userId);
  }
}

// Функция для проверки жизнеспособности соединения
function heartbeat(this: WebSocket) {
  (this as any).isAlive = true;
}

export function initNotificationServer(server: any) {
  // Интервал проверки соединений
  const interval = setInterval(() => {
    wss.clients.forEach((ws: any) => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, WS_CONFIG.OPERATION_TIMEOUT);

  wss.on('close', () => {
    clearInterval(interval);
  });

  server.on('upgrade', (request: any, socket: any, head: any) => {
    const { pathname, query } = parse(request.url, true);
    
    if (pathname === '/ws/notifications') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        const userId = query.userId as string;
        if (!userId) {
          ws.close(1002, 'UserId is required');
          return;
        }

        // Инициализация подключения
        (ws as any).isAlive = true;
        ws.on('pong', heartbeat);

        // Добавление подключения в хранилище
        if (!connections.has(userId)) {
          connections.set(userId, new Set());
        }
        connections.get(userId)?.add(ws);

        // Обработка сообщений
        ws.on('message', (message: string) => {
          try {
            const data: NotificationMessage = JSON.parse(message);
            
            // Обработка пинг-сообщений
            if (data.type === 'ping') {
              ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
              return;
            }

            // Здесь можно добавить обработку других типов сообщений
            console.log('Получено сообщение от клиента:', data);
          } catch (error) {
            console.error('Ошибка при обработке сообщения:', error);
          }
        });

        // Обработка закрытия соединения
        ws.on('close', () => {
          const userConnections = connections.get(userId);
          if (userConnections) {
            userConnections.delete(ws);
            if (userConnections.size === 0) {
              connections.delete(userId);
            }
          }
        });

        // Обработка ошибок
        ws.on('error', (error) => {
          console.error('WebSocket ошибка:', error);
          ws.close(1006, 'Unexpected error');
        });
      });
    }
  });
}

export function sendNotification(notification: NotificationMessage) {
  const { userId, ...notificationData } = notification;
  
  if (userId) {
    // Отправка конкретному пользователю
    const userConnections = connections.get(userId);
    if (userConnections && userConnections.size > 0) {
      const message = {
        ...notificationData,
        timestamp: Date.now()
      };

      let sent = false;
      userConnections.forEach(ws => {
        try {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
            sent = true;
          }
        } catch (error) {
          console.error('Ошибка при отправке уведомления:', error);
        }
      });

      // Если сообщение не было отправлено, добавляем его в очередь
      if (!sent) {
        queueMessage(userId, message);
      }
    } else {
      // Если нет активных соединений, сохраняем сообщение в очередь
      queueMessage(userId, { ...notificationData, timestamp: Date.now() });
    }
  } else {
    // Широковещательная рассылка всем подключенным клиентам
    const message = {
      ...notificationData,
      timestamp: Date.now()
    };

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(JSON.stringify(message));
        } catch (error) {
          console.error('Ошибка при широковещательной рассылке:', error);
        }
      }
    });
  }
}

// Функция для очистки неактивных соединений
function cleanupConnections() {
  connections.forEach((userConnections, userId) => {
    const activeConnections = new Set<WebSocket>();
    
    userConnections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        activeConnections.add(ws);
      }
    });

    if (activeConnections.size === 0) {
      connections.delete(userId);
    } else if (activeConnections.size !== userConnections.size) {
      connections.set(userId, activeConnections);
    }
  });
}

// Запускаем периодическую очистку неактивных соединений
setInterval(cleanupConnections, WS_CONFIG.OPERATION_TIMEOUT);