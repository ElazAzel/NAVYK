# NAVYK - Платформа для развития карьеры студентов

Платформа для аналитики поведения студентов работодателями и университетом.

## Возможности

- 🎓 Для студентов: отслеживание и запись на мероприятия, курсы и вакансии
- 🗺️ Построение карьерного roadmap с рекомендациями
- 💼 Для работодателей: создание вакансий и отслеживание активности студентов
- 🏛️ Для университетов: аналитика активности студентов, управление мероприятиями

## Развертывание

### Локальная разработка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/ElazAzel/NAVYK.git
   cd NAVYK
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Скопируйте .env.example в .env.local и настройте переменные окружения:
   ```bash
   cp .env.example .env.local
   ```

4. Запустите проект:
   ```bash
   npm run dev
   ```

### Развертывание на Vercel

1. Форкните репозиторий на GitHub
2. Создайте новый проект на [Vercel](https://vercel.com)
3. Подключите свой GitHub репозиторий
4. Настройте переменные окружения в настройках проекта
5. Дождитесь автоматического развертывания

## Технологии

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- NextAuth.js
- Socket.IO

## Требования

- Node.js 18+
- npm или yarn
- PostgreSQL (для локальной разработки)

## Лицензия

MIT
