# Примеры использования UI-SAAS компонентов

## Базовые компоненты

### Button (Кнопка)
```tsx
import { Button } from 'ui-saas-navyk'

// Различные варианты кнопок
<Button variant="default">Основная кнопка</Button>
<Button variant="secondary">Вторичная кнопка</Button>
<Button variant="outline">Кнопка с рамкой</Button>
<Button variant="ghost">Прозрачная кнопка</Button>
<Button variant="destructive">Опасная кнопка</Button>

// Размеры
<Button size="sm">Маленькая</Button>
<Button size="default">Обычная</Button>
<Button size="lg">Большая</Button>
<Button size="icon">Иконка</Button>
```

### Card (Карточка)
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'ui-saas-navyk'

<Card>
  <CardHeader>
    <CardTitle>Заголовок карточки</CardTitle>
    <CardDescription>Описание карточки</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Содержимое карточки</p>
  </CardContent>
  <CardFooter>
    <Button>Действие</Button>
  </CardFooter>
</Card>
```

### Input (Поле ввода)
```tsx
import { Input, Label } from 'ui-saas-navyk'

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Введите ваш email" 
  />
</div>
```

## Сложные компоненты

### NavBar (Навигационная панель)
```tsx
import { NavBar } from 'ui-saas-navyk'

// Автоматически адаптируется под роль пользователя
<NavBar />
```

### RoleLayout (Макет с ролью)
```tsx
import { RoleLayout } from 'ui-saas-navyk'

<RoleLayout pageTitle="Дашборд">
  <div>Содержимое страницы</div>
</RoleLayout>
```

### AnalyticsDashboard (Дашборд аналитики)
```tsx
import { AnalyticsDashboard } from 'ui-saas-navyk'

<AnalyticsDashboard 
  data={analyticsData}
  timeRange="month"
  showExport={true}
/>
```

## Анимированные компоненты

### AnimatedCounter (Анимированный счетчик)
```tsx
import { AnimatedCounter } from 'ui-saas-navyk'

<AnimatedCounter 
  from={0} 
  to={1250} 
  duration={2000}
  suffix="₸"
/>
```

### AnimatedProgressBar (Анимированный прогресс-бар)
```tsx
import { AnimatedProgressBar } from 'ui-saas-navyk'

<AnimatedProgressBar 
  value={75} 
  max={100}
  color="primary"
  showLabel={true}
/>
```

## Специализированные компоненты

### CourseCard (Карточка курса)
```tsx
import { CourseCard } from 'ui-saas-navyk'

<CourseCard 
  course={{
    id: "1",
    title: "Основы React",
    description: "Изучите основы React с нуля",
    duration: "8 недель",
    level: "Начинающий",
    price: 15000,
    rating: 4.8,
    studentsCount: 324,
    image: "/course-image.jpg"
  }}
  onEnroll={handleEnroll}
/>
```

### EventCard (Карточка мероприятия)
```tsx
import { EventCard } from 'ui-saas-navyk'

<EventCard 
  event={{
    id: "1",
    title: "IT Career Fair 2025",
    date: "2025-07-15",
    time: "10:00",
    location: "Алматы, IT-парк",
    type: "Карьерная ярмарка",
    attendees: 250,
    maxAttendees: 500
  }}
  onRegister={handleRegister}
/>
```

### DragDropRoadmap (Интерактивная карьерная карта)
```tsx
import { DragDropRoadmap } from 'ui-saas-navyk'

<DragDropRoadmap 
  roadmapData={careerPath}
  onStepComplete={handleStepComplete}
  onReorder={handleReorder}
  editable={true}
/>
```

## Аналитические компоненты

### RealTimeAnalytics (Аналитика в реальном времени)
```tsx
import { RealTimeAnalytics } from 'ui-saas-navyk'

<RealTimeAnalytics 
  endpoint="/api/analytics/realtime"
  updateInterval={5000}
  metrics={['users', 'sessions', 'pageviews']}
/>
```

### EmploymentAnalytics (Аналитика трудоустройства)
```tsx
import { EmploymentAnalytics } from 'ui-saas-navyk'

<EmploymentAnalytics 
  data={employmentData}
  university="КазНТУ"
  timeframe="year"
  showTrends={true}
/>
```

## Уведомления

### NotificationBell (Колокольчик уведомлений)
```tsx
import { NotificationBell } from 'ui-saas-navyk'

<NotificationBell 
  count={3}
  maxCount={99}
  onNotificationClick={handleNotificationClick}
/>
```

### Toast (Всплывающие уведомления)
```tsx
import { useToast, toast } from 'ui-saas-navyk'

const { toast } = useToast()

// Показать уведомление
toast({
  title: "Успешно!",
  description: "Ваш профиль был обновлен",
  variant: "default",
})

// Уведомление об ошибке
toast({
  title: "Ошибка",
  description: "Не удалось сохранить изменения",
  variant: "destructive",
})
```

## Формы

### JobForm (Форма вакансии)
```tsx
import { JobForm } from 'ui-saas-navyk'

<JobForm 
  onSubmit={handleJobSubmit}
  initialData={existingJob}
  mode="create" // или "edit"
/>
```

## Фильтрация и поиск

### RecommendationFilters (Фильтры рекомендаций)
```tsx
import { RecommendationFilters } from 'ui-saas-navyk'

<RecommendationFilters 
  filters={availableFilters}
  onFilterChange={handleFilterChange}
  activeFilters={currentFilters}
/>
```

## Административные компоненты

### SecurityMonitor (Монитор безопасности)
```tsx
import { SecurityMonitor } from 'ui-saas-navyk'

<SecurityMonitor 
  alerts={securityAlerts}
  onAlertAction={handleAlertAction}
  refreshInterval={30000}
/>
```

### MLModelManagement (Управление ML моделями)
```tsx
import { MLModelManagement } from 'ui-saas-navyk'

<MLModelManagement 
  models={mlModels}
  onModelDeploy={handleModelDeploy}
  onModelRetrain={handleModelRetrain}
/>
```

## Темизация

### ToggleButton (Переключатель темы)
```tsx
import { ToggleButton } from 'ui-saas-navyk'

// Автоматически переключает между светлой и темной темой
<ToggleButton />
```

## Контексты и провайдеры

### AuthProvider (Провайдер авторизации)
```tsx
import { AuthProvider } from 'ui-saas-navyk'

<AuthProvider>
  <App />
</AuthProvider>
```

### NotificationsProvider (Провайдер уведомлений)
```tsx
import { NotificationsProvider } from 'ui-saas-navyk'

<NotificationsProvider>
  <App />
</NotificationsProvider>
```

## Хуки

### useAuth (Хук авторизации)
```tsx
import { useAuth } from 'ui-saas-navyk'

function MyComponent() {
  const { user, login, logout, isLoading } = useAuth()
  
  if (isLoading) return <div>Загрузка...</div>
  
  return (
    <div>
      {user ? (
        <div>
          <p>Добро пожаловать, {user.name}!</p>
          <Button onClick={logout}>Выйти</Button>
        </div>
      ) : (
        <Button onClick={() => login('email', 'password')}>
          Войти
        </Button>
      )}
    </div>
  )
}
```

### useMediaQuery (Хук медиа-запросов)
```tsx
import { useMediaQuery } from 'ui-saas-navyk'

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  
  return (
    <div>
      {isMobile && <MobileLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  )
}
```

## Утилиты

### cn (Объединение классов)
```tsx
import { cn } from 'ui-saas-navyk'

<div className={cn(
  "base-classes",
  variant === "primary" && "primary-classes",
  disabled && "disabled-classes"
)}>
  Содержимое
</div>
```

### ROUTES (Маршруты)
```tsx
import { ROUTES } from 'ui-saas-navyk'

// Использование предопределенных маршрутов
<Link href={ROUTES.STUDENT.DASHBOARD}>
  Дашборд студента
</Link>
```
