import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PROTECTED_ROUTES, ROUTES } from './lib/routes'

export function middleware(request: NextRequest) {
  // Временно отключаем проверку авторизации для демонстрационных целей
  return NextResponse.next()
  
  // Старая реализация (закомментирована)
  /*
  // Получаем текущий путь
  const path = request.nextUrl.pathname

  // Проверяем, является ли путь защищенным
  const isProtectedRoute = Object.keys(PROTECTED_ROUTES).some(route =>
    path.startsWith(route)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Получаем токен из куки
  const token = request.cookies.get('auth-token')?.value

  // Если нет токена, редиректим на главную
  if (!token) {
    const loginUrl = new URL(ROUTES.HOME, request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Здесь можно добавить дополнительную проверку роли пользователя
  // на основе декодированного токена

  return NextResponse.next()
  */
}

// Конфигурация: указываем, для каких путей срабатывает middleware
export const config = {
  matcher: [
    '/student/:path*',
    '/employer/:path*',
    '/university/:path*',
    '/mentor/:path*',
    '/admin/:path*',
  ],
} 