// UI-SAAS - Основные экспорты компонентов NAVYK

// Базовые UI компоненты
export { Alert, AlertDescription, AlertTitle } from './components/ui/alert'
export { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
export { Badge, badgeVariants } from './components/ui/badge'
export { Button, buttonVariants } from './components/ui/button'
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
export { Checkbox } from './components/ui/checkbox'
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu'
export { Input } from './components/ui/input'
export { Label } from './components/ui/label'
export { Progress } from './components/ui/progress'
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
export { Separator } from './components/ui/separator'
export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet'
export { Slider } from './components/ui/slider'
export { Switch } from './components/ui/switch'
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
export { Textarea } from './components/ui/textarea'
export { toast, useToast } from './components/ui/use-toast'
export { Toaster } from './components/ui/toaster'

// Основные компоненты
export { default as NavBar } from './components/NavBar'
export { default as SideNav } from './components/SideNav'
export { default as RoleLayout } from './components/RoleLayout'
export { default as RoleNavigation } from './components/RoleNavigation'
export { default as UserNav } from './components/UserNav'
export { default as Logo } from './components/Logo'
export { default as Footer } from './components/Footer'
export { default as PageLayout } from './components/PageLayout'
export { default as ToggleButton } from './components/ToggleButton'

// Анимации
export { AnimatedBackground } from './components/animations/AnimatedBackground'
export { AnimatedCards } from './components/animations/AnimatedCards'
export { AnimatedCounter } from './components/animations/AnimatedCounter'
export { AnimatedDemoChart } from './components/animations/AnimatedDemoChart'
export { AnimatedTextChanger } from './components/animations/AnimatedTextChanger'
export { 
  AnimatedStatistics, 
  AnimatedProgressBar,
  AnimatedDemoChart as AnimatedChart
} from './components/animations'

// Специализированные компоненты
export { default as AnalyticsDashboard } from './components/AnalyticsDashboard'
export { default as CareerRoadmap } from './components/CareerRoadmap'
export { default as CourseCard } from './components/CourseCard'
export { default as EventCard } from './components/EventCard'
export { default as JobForm } from './components/JobForm'
export { default as JobListings } from './components/JobListings'
export { default as RecommendationCard } from './components/RecommendationCard'
export { default as AchievementCard } from './components/AchievementCard'
export { default as UserLevel } from './components/UserLevel'

// Аналитика
export { default as RealTimeAnalytics } from './components/analytics/RealTimeAnalytics'

// Карьера
export { default as DragDropRoadmap } from './components/career/DragDropRoadmap'

// Работодатели
export { default as RecommendationAnalytics } from './components/employer/RecommendationAnalytics'
export { default as RecommendationInsights } from './components/employer/RecommendationInsights'
export { default as RecommendationInsightsModal } from './components/employer/RecommendationInsightsModal'

// Университеты
export { default as CoursesAnalytics } from './components/university/CoursesAnalytics'
export { default as DemographicsChart } from './components/university/DemographicsChart'
export { default as EmploymentAnalytics } from './components/university/EmploymentAnalytics'
export { default as EventParticipationChart } from './components/university/EventParticipationChart'
export { default as StudentSatisfaction } from './components/university/StudentSatisfaction'
export { default as UniversityComparison } from './components/university/UniversityComparison'

// Рекомендации
export { default as AIRecommendationEngine } from './components/recommendations/AIRecommendationEngine'
export { default as EnhancedRecommendationEngine } from './components/recommendations/EnhancedRecommendationEngine'
export { default as MarketInsights } from './components/recommendations/MarketInsights'
export { default as RecommendationFilters } from './components/recommendations/RecommendationFilters'

// Уведомления
export { default as NotificationBell } from './components/notifications/NotificationBell'
export { default as NotificationsProvider } from './components/notifications/NotificationsProvider'

// Администрирование
export { default as MLModelManagement } from './components/admin/MLModelManagement'
export { default as SecurityMonitor } from './components/admin/SecurityMonitor'
export { default as SiteMapManager } from './components/admin/SiteMapManager'

// Интеграции
export { default as ExternalServiceIntegration } from './components/integrations/ExternalServiceIntegration'

// Улучшения платформы
export { default as PlatformEnhancements } from './components/platform-improvements/PlatformEnhancements'

// Утилиты
export { cn } from './lib/utils'
export { ROUTES, USER_NAVIGATION, PROTECTED_ROUTES, USER_HOME_ROUTES } from './lib/routes'
export { navigationConfig } from './lib/navigation'

// Контексты
export { AuthProvider, useAuth } from './context/auth-context'
export type { User, UserRole } from './context/auth-context'

// Хуки
export { useMediaQuery } from './hooks/use-media-query'

// Типы
export type { AppRoute, AppRoutes } from './lib/types/app-routes'
