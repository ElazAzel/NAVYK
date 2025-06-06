# UI-SAAS - Компоненты пользовательского интерфейса NAVYK

Эта папка содержит все UI компоненты, макеты и страницы платформы NAVYK, организованные для удобного использования и переиспользования.

## 📁 Структура папок

### `/components`
Основные компоненты пользовательского интерфейса:

#### `/ui` - Базовые UI компоненты
- **alert.tsx** - Компонент уведомлений
- **avatar.tsx** - Аватары пользователей
- **badge.tsx** - Значки и метки
- **button.tsx** - Кнопки различных типов
- **card.tsx** - Карточки контента
- **dropdown-menu.tsx** - Выпадающие меню
- **input.tsx** - Поля ввода
- **tabs.tsx** - Вкладки
- **progress.tsx** - Прогресс-бары
- И многие другие базовые компоненты...

#### `/animations` - Анимированные компоненты
- **AnimatedBackground.tsx** - Анимированный фон
- **AnimatedCards.tsx** - Анимированные карточки
- **AnimatedCounter.tsx** - Анимированный счетчик
- **AnimatedDemoChart.tsx** - Анимированные графики
- **AnimatedTextChanger.tsx** - Анимированная смена текста

#### `/analytics` - Компоненты аналитики
- **RealTimeAnalytics.tsx** - Аналитика в реальном времени

#### `/career` - Компоненты карьеры
- **DragDropRoadmap.tsx** - Интерактивная карьерная карта

#### `/employer` - Компоненты для работодателей
- **RecommendationAnalytics.tsx** - Аналитика рекомендаций
- **RecommendationInsights.tsx** - Инсайты рекомендаций
- **RecommendationInsightsModal.tsx** - Модальное окно инсайтов

#### `/university` - Компоненты для университетов
- **CoursesAnalytics.tsx** - Аналитика курсов
- **DemographicsChart.tsx** - Демографические графики
- **EmploymentAnalytics.tsx** - Аналитика трудоустройства
- **StudentSatisfaction.tsx** - Удовлетворенность студентов

#### `/recommendations` - Компоненты рекомендаций
- **AIRecommendationEngine.tsx** - ИИ движок рекомендаций
- **EnhancedRecommendationEngine.tsx** - Улучшенный движок рекомендаций
- **MarketInsights.tsx** - Рыночные инсайты

#### `/notifications` - Компоненты уведомлений
- **NotificationBell.tsx** - Колокольчик уведомлений
- **NotificationsProvider.tsx** - Провайдер уведомлений

#### `/admin` - Административные компоненты
- **MLModelManagement.tsx** - Управление ML моделями
- **SecurityMonitor.tsx** - Монитор безопасности
- **SiteMapManager.tsx** - Управление картой сайта

#### Основные компоненты:
- **NavBar.tsx** - Навигационная панель
- **SideNav.tsx** - Боковая навигация
- **RoleLayout.tsx** - Макет для ролей
- **RoleNavigation.tsx** - Навигация по ролям
- **UserNav.tsx** - Пользовательская навигация
- **Logo.tsx** - Логотип
- **Footer.tsx** - Подвал сайта

### `/layouts`
Макеты страниц:
- **layout.tsx** - Основной макет приложения
- **globals.css** - Глобальные стили

### `/pages`
Примеры страниц для разных ролей:
- **/student** - Страницы студента
- **/employer** - Страницы работодателя
- **/university** - Страницы университета
- **/admin** - Административные страницы
- **/mentor** - Страницы ментора

### `/lib`
Вспомогательные библиотеки:
- **utils.ts** - Утилиты
- **routes.ts** - Маршруты
- **navigation.ts** - Конфигурация навигации

### `/context`
React контексты:
- **auth-context.tsx** - Контекст авторизации

### `/hooks`
Пользовательские хуки:
- **use-media-query.ts** - Хук медиа-запросов

## 🎨 Дизайн-система

Компоненты построены на основе:
- **Tailwind CSS** для стилизации
- **Radix UI** для доступности
- **Framer Motion** для анимаций
- **Lucide React** для иконок

## 🔧 Использование

```tsx
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { NavBar } from './components/NavBar'

function MyPage() {
  return (
    <div>
      <NavBar />
      <Card>
        <Button>Кнопка</Button>
      </Card>
    </div>
  )
}
```

## 🌈 Возможности

- **Адаптивный дизайн** - Все компоненты адаптированы для мобильных устройств
- **Темная/светлая тема** - Поддержка переключения тем
- **Интернационализация** - Готовность к локализации
- **Анимации** - Плавные переходы и анимации
- **Доступность** - Соответствие стандартам WCAG
- **TypeScript** - Полная типизация

## 📱 Роли пользователей

Компоненты поддерживают различные роли:
- **Студент** - Обучение, карьера, достижения
- **Работодатель** - Поиск талантов, управление вакансиями
- **Университет** - Управление студентами, аналитика
- **Ментор** - Менторство, сессии
- **Администратор** - Управление системой

## 🚀 Особенности

- **Компонентная архитектура** - Переиспользуемые компоненты
- **Производительность** - Оптимизированная загрузка
- **SEO-оптимизация** - Готовность к поисковым системам
- **Безопасность** - Встроенные механизмы защиты
- **Масштабируемость** - Легко расширяемая архитектура

---

📧 **Поддержка**: support@navyk.kz  
🌐 **Сайт**: https://navyk.kz  
📱 **Версия**: 1.0.0  
📅 **Обновлено**: Июнь 2025
