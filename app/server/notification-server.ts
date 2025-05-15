import { Server } from 'ws';
import { parse } from 'url';

interface NotificationMessage {
  type: 'recommendation' | 'event' | 'deadline' | 'update';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  userId?: string;
}

const wss = new Server({ noServer: true });

// Хранилище подключений с привязкой к userId
const connections = new Map<string, WebSocket[]>();

export function initNotificationServer(server: any) {
  server.on('upgrade', (request: any, socket: any, head: any) => {
    const { pathname, query } = parse(request.url, true);
    
    if (pathname === '/ws/notifications') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        const userId = query.userId as string;
        if (userId) {
          if (!connections.has(userId)) {
            connections.set(userId, []);
          }
          connections.get(userId)?.push(ws);
          
          ws.on('close', () => {
            const userConnections = connections.get(userId);
            if (userConnections) {
              const index = userConnections.indexOf(ws);
              if (index !== -1) {
                userConnections.splice(index, 1);
              }
              if (userConnections.length === 0) {
                connections.delete(userId);
              }
            }
          });
        }
      });
    }
  });
}

export function sendNotification(notification: NotificationMessage) {
  const { userId, ...notificationData } = notification;
  
  if (userId) {
    // Отправляем уведомление конкретному пользователю
    const userConnections = connections.get(userId);
    if (userConnections) {
      userConnections.forEach(ws => {
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify(notificationData));
        }
      });
    }
  } else {
    // Отправляем всем подключенным клиентам
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(notificationData));
      }
    });
  }
}

// Пример функции для отправки уведомлений о новых рекомендациях
export function sendRecommendationNotification(
  userId: string,
  title: string,
  description: string,
  priority: NotificationMessage['priority'] = 'medium'
) {
  sendNotification({
    type: 'recommendation',
    title,
    description,
    priority,
    userId
  });
}

// Пример функции для отправки уведомлений о событиях
export function sendEventNotification(
  userId: string,
  title: string,
  description: string,
  priority: NotificationMessage['priority'] = 'medium'
) {
  sendNotification({
    type: 'event',
    title,
    description,
    priority,
    userId
  });
}

// Пример функции для отправки уведомлений о дедлайнах
export function sendDeadlineNotification(
  userId: string,
  title: string,
  description: string,
  priority: NotificationMessage['priority'] = 'high'
) {
  sendNotification({
    type: 'deadline',
    title,
    description,
    priority,
    userId
  });
}