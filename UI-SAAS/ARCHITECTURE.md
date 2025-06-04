# Архитектура UI-SAAS компонентов

## 🏗️ Принципы архитектуры

### 1. Атомарный дизайн
Компоненты организованы по принципу атомарного дизайна:

- **Атомы** (`/ui`) - Базовые компоненты (Button, Input, Label)
- **Молекулы** (`/components`) - Простые группы компонентов (Card с содержимым)
- **Организмы** (`/components`) - Сложные компоненты (NavBar, Dashboard)
- **Шаблоны** (`/layouts`) - Макеты страниц
- **Страницы** (`/pages`) - Готовые страницы

### 2. Композиция над наследованием
```tsx
// ✅ Хорошо - композиция
<Card>
  <CardHeader>
    <CardTitle>Заголовок</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Действие</Button>
  </CardContent>
</Card>

// ❌ Плохо - монолитный компонент
<CardWithTitleAndButton title="Заголовок" buttonText="Действие" />
```

### 3. Prop drilling vs Context
```tsx
// Для глобального состояния - Context
const { user } = useAuth()

// Для локальных данных - props
<CourseCard course={courseData} onEnroll={handleEnroll} />
```

## 🎨 Дизайн-система

### Цветовая палитра
```css
:root {
  --primary: 212 100% 50%;        /* Основной цвет */
  --secondary: 210 40% 95%;       /* Вторичный цвет */
  --accent: 142 76% 36%;          /* Акцентный цвет */
  --destructive: 0 84% 60%;       /* Цвет ошибок */
  --muted: 210 40% 95%;           /* Приглушенный цвет */
  --background: 0 0% 100%;        /* Фон */
  --foreground: 222 84% 5%;       /* Текст */
}
```

### Типографика
```css
/* Заголовки */
.h1 { font-size: 2.25rem; line-height: 2.5rem; font-weight: 800; }
.h2 { font-size: 1.875rem; line-height: 2.25rem; font-weight: 700; }
.h3 { font-size: 1.5rem; line-height: 2rem; font-weight: 600; }
.h4 { font-size: 1.25rem; line-height: 1.75rem; font-weight: 600; }

/* Текст */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
```

### Spacing (Отступы)
```css
/* Система 4px grid */
.space-1 { gap: 0.25rem; }  /* 4px */
.space-2 { gap: 0.5rem; }   /* 8px */
.space-3 { gap: 0.75rem; }  /* 12px */
.space-4 { gap: 1rem; }     /* 16px */
.space-6 { gap: 1.5rem; }   /* 24px */
.space-8 { gap: 2rem; }     /* 32px */
```

## 🧩 Структура компонентов

### Базовый компонент
```tsx
interface ComponentProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ children, className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Базовые стили
          'inline-flex items-center justify-center',
          // Варианты
          {
            'bg-primary text-primary-foreground': variant === 'default',
            'bg-secondary text-secondary-foreground': variant === 'secondary',
            'border border-input': variant === 'outline',
          },
          // Размеры
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
```

### Compound компоненты
```tsx
// Основной компонент
const Card = React.forwardRef<HTMLDivElement, CardProps>(...)

// Подкомпоненты
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(...)
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(...)
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(...)

// Экспорт как группа
export { Card, CardHeader, CardContent, CardFooter }
```

## 🔄 Состояние и данные

### Локальное состояние
```tsx
function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<Data[]>([])
  
  return (
    <div>
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  )
}
```

### Глобальное состояние (Context)
```tsx
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### Серверное состояние
```tsx
function useUserData(userId: string) {
  return useSWR(`/api/users/${userId}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
}
```

## 🎭 Анимации

### Принципы анимаций
1. **Meaningful** - Анимации должны иметь смысл
2. **Fast** - Быстрые (200-300ms для микро-взаимодействий)
3. **Smooth** - Плавные переходы
4. **Reduced motion** - Учет пользовательских предпочтений

```tsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
>
  Содержимое
</motion.div>
```

### Анимированные списки
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## 📱 Отзывчивость

### Mobile-first подход
```tsx
// ✅ Хорошо - mobile-first
className="text-sm md:text-base lg:text-lg"

// ❌ Плохо - desktop-first
className="text-lg md:text-base sm:text-sm"
```

### Контрольные точки
```css
/* Tailwind breakpoints */
sm: 640px   /* Планшеты */
md: 768px   /* Планшеты горизонтально */
lg: 1024px  /* Ноутбуки */
xl: 1280px  /* Десктопы */
2xl: 1536px /* Большие экраны */
```

### Адаптивные компоненты
```tsx
function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  )
}
```

## ♿ Доступность

### ARIA атрибуты
```tsx
<button
  aria-label="Закрыть модальное окно"
  aria-expanded={isOpen}
  aria-controls="modal-content"
>
  <X className="h-4 w-4" />
</button>
```

### Навигация с клавиатуры
```tsx
function Modal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  return <div role="dialog" aria-modal="true">...</div>
}
```

### Фокус-менеджмент
```tsx
function Dialog() {
  const firstElementRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    firstElementRef.current?.focus()
  }, [])
  
  return (
    <div>
      <button ref={firstElementRef}>Первый элемент</button>
    </div>
  )
}
```

## 🧪 Тестирование

### Unit тесты
```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })
  
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Integration тесты
```tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from './AuthProvider'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('logs in user successfully', async () => {
    const user = userEvent.setup()
    
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Войти' }))
    
    await waitFor(() => {
      expect(screen.getByText('Добро пожаловать!')).toBeInTheDocument()
    })
  })
})
```

## 🚀 Производительность

### Lazy loading
```tsx
const DashboardChart = lazy(() => import('./DashboardChart'))

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <DashboardChart />
    </Suspense>
  )
}
```

### Мемоизация
```tsx
const ExpensiveComponent = memo(({ data }: { data: ComplexData }) => {
  const processedData = useMemo(() => {
    return expensiveCalculation(data)
  }, [data])
  
  return <div>{processedData}</div>
})
```

### Виртуализация списков
```tsx
import { FixedSizeList as List } from 'react-window'

function VirtualizedList({ items }: { items: Item[] }) {
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  )
  
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
    >
      {Row}
    </List>
  )
}
```

## 📋 Лучшие практики

### 1. Именование компонентов
- PascalCase для компонентов: `UserProfile`
- camelCase для функций и переменных: `handleSubmit`
- kebab-case для CSS классов: `user-profile`

### 2. Структура файлов
```
ComponentName/
├── index.ts          # Экспорты
├── ComponentName.tsx # Основной компонент
├── ComponentName.test.tsx # Тесты
├── ComponentName.stories.tsx # Storybook
└── types.ts          # Типы
```

### 3. Экспорты
```tsx
// ✅ Именованные экспорты
export { Button } from './Button'
export { Card, CardHeader } from './Card'

// ❌ Избегайте default экспортов для библиотек
export default Button
```

### 4. Типизация
```tsx
// ✅ Расширяйте HTML атрибуты
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

// ✅ Используйте дискриминированные unions
type AlertProps = 
  | { variant: 'success'; message: string }
  | { variant: 'error'; message: string; retry?: () => void }
```
