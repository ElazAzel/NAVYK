const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Инициализация приложения и сервера
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Секретный ключ для JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// URL ML сервиса
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

// Middleware для аутентификации сокетов
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Требуется аутентификация'));
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error('Недействительный токен'));
  }
});

// Функция для получения рекомендаций из ML сервиса
async function fetchRecommendations(userId, category = 'all', limit = 10) {
  try {
    // В реальном приложении здесь будет запрос к ML API
    // const response = await axios.post(`${ML_SERVICE_URL}/recommendations`, {
    //   userId,
    //   category,
    //   limit
    // });
    // return response.data;
    
    // Симуляция ответа
    return {
      userId,
      timestamp: new Date().toISOString(),
      recommendations: [
        {
          id: "course-1",
          title: "Python для анализа данных",
          type: "course",
          matchScore: 95,
          skills: ["Python", "Data Analysis"]
        },
        {
          id: "job-1",
          title: "Junior Data Analyst",
          type: "job",
          matchScore: 88,
          skills: ["SQL", "Python"]
        },
        {
          id: "event-1",
          title: "SQL Workshop",
          type: "event",
          matchScore: 91,
          skills: ["SQL", "Data Analysis"]
        }
      ]
    };
  } catch (error) {
    console.error('Ошибка при получении рекомендаций:', error);
    return { error: 'Не удалось получить рекомендации', details: error.message };
  }
}

// Функция для получения аналитики пользователя
async function fetchUserAnalytics(userId) {
  try {
    // В реальном приложении здесь будет запрос к аналитическому API
    // const response = await axios.get(`${ML_SERVICE_URL}/analytics/${userId}`);
    // return response.data;
    
    // Симуляция ответа
    return {
      userId,
      timestamp: new Date().toISOString(),
      skills: {
        technical: [
          { name: "Python", level: 8, trend: "up" },
          { name: "SQL", level: 7, trend: "up" },
          { name: "Data Analysis", level: 6, trend: "stable" }
        ],
        soft: [
          { name: "Communication", level: 7, trend: "stable" },
          { name: "Teamwork", level: 8, trend: "up" }
        ]
      },
      activity: {
        coursesCompleted: 5,
        eventsAttended: 3,
        jobApplications: 2
      },
      marketFit: {
        score: 75,
        topRoles: [
          { title: "Data Analyst", match: 85 },
          { title: "Business Analyst", match: 78 },
          { title: "Junior Data Scientist", match: 65 }
        ]
      }
    };
  } catch (error) {
    console.error('Ошибка при получении аналитики:', error);
    return { error: 'Не удалось получить аналитику', details: error.message };
  }
}

// Функция для получения активности в реальном времени
let globalActivity = [];

function addActivityEvent(event) {
  // Ограничиваем размер массива активности
  if (globalActivity.length >= 100) {
    globalActivity.shift();
  }
  
  globalActivity.push({
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...event
  });
  
  // Отправка события всем подключенным администраторам
  io.to('admin-room').emit('activity-update', event);
}

// Обработка подключения сокетов
io.on('connection', (socket) => {
  console.log('Пользователь подключен:', socket.user.id);
  
  // Добавление пользователя в комнаты на основе его роли
  if (socket.user.role === 'admin') {
    socket.join('admin-room');
    
    // Отправка всей активности администраторам при подключении
    socket.emit('activity-history', globalActivity);
  }
  
  if (socket.user.role === 'university') {
    socket.join('university-room');
    socket.join(`university-${socket.user.universityId}`);
  }
  
  if (socket.user.role === 'employer') {
    socket.join('employer-room');
    socket.join(`employer-${socket.user.employerId}`);
  }
  
  // Обработка запроса рекомендаций
  socket.on('get-recommendations', async (data) => {
    const { category, limit } = data;
    const recommendations = await fetchRecommendations(socket.user.id, category, limit);
    socket.emit('recommendations', recommendations);
    
    // Записываем активность
    addActivityEvent({
      userId: socket.user.id,
      action: 'request-recommendations',
      details: { category, limit }
    });
  });
  
  // Обработка запроса аналитики
  socket.on('get-analytics', async () => {
    const analytics = await fetchUserAnalytics(socket.user.id);
    socket.emit('analytics', analytics);
    
    // Записываем активность
    addActivityEvent({
      userId: socket.user.id,
      action: 'request-analytics'
    });
  });
  
  // Обработка событий активности пользователя
  socket.on('user-action', (action) => {
    // Защита от внедрения
    const safeAction = {
      type: action.type,
      targetId: action.targetId,
      details: action.details ? JSON.parse(JSON.stringify(action.details)) : {}
    };
    
    // Регистрация активности
    addActivityEvent({
      userId: socket.user.id,
      username: socket.user.username,
      role: socket.user.role,
      action: safeAction.type,
      targetId: safeAction.targetId,
      details: safeAction.details
    });
    
    // Рассылка события соответствующим пользователям
    switch (safeAction.type) {
      case 'view-course':
        // Уведомление администраторов университета о просмотре курса
        io.to(`university-${safeAction.details.universityId}`).emit('user-viewed-course', {
          userId: socket.user.id,
          courseId: safeAction.targetId,
          timestamp: new Date().toISOString()
        });
        break;
        
      case 'apply-job':
        // Уведомление работодателя о заявке на вакансию
        io.to(`employer-${safeAction.details.employerId}`).emit('job-application', {
          userId: socket.user.id,
          username: socket.user.username,
          jobId: safeAction.targetId,
          timestamp: new Date().toISOString()
        });
        break;
        
      case 'register-event':
        // Уведомление организаторов о регистрации на мероприятие
        io.to(`university-${safeAction.details.organizerId}`).emit('event-registration', {
          userId: socket.user.id,
          username: socket.user.username,
          eventId: safeAction.targetId,
          timestamp: new Date().toISOString()
        });
        break;
    }
  });
  
  // Обработка отключения
  socket.on('disconnect', () => {
    console.log('Пользователь отключен:', socket.user.id);
    
    // Записываем активность отключения
    addActivityEvent({
      userId: socket.user.id,
      action: 'user-disconnected'
    });
  });
});

// REST эндпоинты для работы с рекомендациями
app.post('/api/recommendations', async (req, res) => {
  try {
    // Проверка авторизации
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const { category, limit } = req.body;
    const recommendations = await fetchRecommendations(decoded.id, category, limit);
    
    // Записываем активность
    addActivityEvent({
      userId: decoded.id,
      action: 'api-request-recommendations',
      details: { category, limit }
    });
    
    return res.json(recommendations);
  } catch (error) {
    console.error('Ошибка API рекомендаций:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// REST эндпоинт для работы с аналитикой
app.get('/api/analytics/:userId', async (req, res) => {
  try {
    // Проверка авторизации
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Проверка прав доступа (пользователь может получить только свою аналитику или администратор)
    if (decoded.id !== req.params.userId && decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }
    
    const analytics = await fetchUserAnalytics(req.params.userId);
    
    // Записываем активность
    addActivityEvent({
      userId: decoded.id,
      action: 'api-request-analytics',
      targetId: req.params.userId
    });
    
    return res.json(analytics);
  } catch (error) {
    console.error('Ошибка API аналитики:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Обработка необработанных ошибок
process.on('uncaughtException', (error) => {
  console.error('Необработанная ошибка:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Необработанное отклонение Promise:', reason);
});

module.exports = { app, server, io }; 