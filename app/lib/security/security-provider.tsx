'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { jwtVerify, SignJWT } from 'jose';
import { usePathname, useRouter } from 'next/navigation';

// Создадим простую замену для toast без импорта
interface ToastParams {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

const toast = (params: ToastParams) => {
  console.log('Toast notification:', params);
  // В реальном приложении здесь был бы вызов UI компонента
};

// Типы для системы безопасности
interface SecurityState {
  currentToken: string | null;
  csrfToken: string | null;
  lastActivity: Date | null;
  isAuthenticated: boolean;
  userRoles: string[];
  sessionExpiry: Date | null;
  securityReport: SecurityReport;
}

interface SecurityReport {
  failedLoginAttempts: number;
  suspiciousActivities: SecurityIncident[];
  threatLevel: 'low' | 'medium' | 'high';
  lastScan: Date | null;
}

interface SecurityIncident {
  id: string;
  timestamp: Date;
  type: 'login_attempt' | 'csrf_attempt' | 'xss_attempt' | 'unusual_activity' | 'multiple_requests';
  source: string;
  details: string;
  resolved: boolean;
}

interface SecurityContextType extends SecurityState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  validatePermission: (permission: string) => boolean;
  getCsrfToken: () => string;
  secureHeaders: Record<string, string>;
  reportIncident: (incidentType: SecurityIncident['type'], details: string) => void;
  resolveIncident: (id: string) => void;
  scanForVulnerabilities: () => Promise<void>;
  secureFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

// Создание контекста безопасности
const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

// Хук для использования контекста безопасности
export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity должен использоваться внутри SecurityProvider');
  }
  return context;
};

// Провайдер безопасности для приложения
export const SecurityProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Начальное состояние безопасности
  const [securityState, setSecurityState] = useState<SecurityState>({
    currentToken: null,
    csrfToken: null,
    lastActivity: null,
    isAuthenticated: false,
    userRoles: [],
    sessionExpiry: null,
    securityReport: {
      failedLoginAttempts: 0,
      suspiciousActivities: [],
      threatLevel: 'low',
      lastScan: null,
    }
  });
  
  // Обновление токена
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      if (securityState.isAuthenticated && securityState.userRoles.length > 0) {
        const secret = new TextEncoder().encode(
          process.env.NEXT_PUBLIC_JWT_SECRET || 'default_secret_key_for_jwt_please_change_in_production'
        );
        
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 2);
        
        const token = await new SignJWT({ 
          roles: securityState.userRoles
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime(expiryDate.getTime() / 1000)
          .sign(secret);
        
        localStorage.setItem('navyk_token', token);
        
        setSecurityState(prev => ({
          ...prev,
          currentToken: token,
          sessionExpiry: expiryDate,
          lastActivity: new Date()
        }));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      return false;
    }
  }, [securityState.isAuthenticated, securityState.userRoles]);

  // Проверка и обновление токена
  const verifyAndRefreshToken = useCallback(async (token: string) => {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET || 'default_secret_key_for_jwt_please_change_in_production'
      );
      
      const { payload } = await jwtVerify(token, secret);
      
      if (payload.exp && typeof payload.exp === 'number') {
        const expiryDate = new Date(payload.exp * 1000);
        
        const tenMinutes = 10 * 60 * 1000;
        if (expiryDate.getTime() - Date.now() < tenMinutes) {
          return refreshToken();
        }
        
        setSecurityState(prev => ({
          ...prev,
          currentToken: token,
          isAuthenticated: true,
          userRoles: payload.roles as string[] || [],
          sessionExpiry: expiryDate
        }));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ошибка проверки токена:', error);
      return false;
    }
  }, [refreshToken]);
  
  // Генерация CSRF токена при загрузке
  useEffect(() => {
    // Генерация уникального CSRF токена
    const generateCsrfToken = () => {
      const tokenBytes = new Uint8Array(32);
      crypto.getRandomValues(tokenBytes);
      return Array.from(tokenBytes, b => b.toString(16).padStart(2, '0')).join('');
    };
    
    setSecurityState(prev => ({
      ...prev,
      csrfToken: generateCsrfToken(),
      lastActivity: new Date()
    }));
    
    // Проверка локального хранилища на наличие токена
    const storedToken = localStorage.getItem('navyk_token');
    if (storedToken) {
      verifyAndRefreshToken(storedToken);
    }
  }, [verifyAndRefreshToken]);
  
  // Мониторинг активности пользователя
  useEffect(() => {
    // Обновление времени последней активности
    const handleUserActivity = () => {
      setSecurityState(prev => ({
        ...prev,
        lastActivity: new Date()
      }));
    };
    
    // Отслеживание событий для обновления времени активности
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, [setSecurityState]);
  
  // Мемоизируем функцию logout
  const logout = useCallback(() => {
    // Удаление токена
    localStorage.removeItem('navyk_token');
    
    // Обновление состояния безопасности
    setSecurityState(prev => ({
      ...prev,
      currentToken: null,
      isAuthenticated: false,
      userRoles: [],
      sessionExpiry: null
    }));
    
    // Перенаправление на страницу входа
    router.push('/login');
  }, [router]);
  
  // Автоматический выход при неактивности
  useEffect(() => {
    // Выход после 30 минут неактивности
    const inactivityTimeout = 30 * 60 * 1000; // 30 минут
    let timeoutId: NodeJS.Timeout;
    
    const checkInactivity = () => {
      const lastActivity = securityState.lastActivity;
      if (lastActivity && securityState.isAuthenticated) {
        const inactiveDuration = Date.now() - lastActivity.getTime();
        if (inactiveDuration > inactivityTimeout) {
          logout();
          toast({
            title: "Сессия завершена",
            description: "Вы были автоматически выход из-за длительной неактивности",
            variant: "destructive"
          });
        }
      }
    };
    
    // Проверка каждую минуту
    timeoutId = setInterval(checkInactivity, 60 * 1000);
    return () => clearInterval(timeoutId);
  }, [logout, securityState.lastActivity, securityState.isAuthenticated]);
  
  // Аутентификация пользователя
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // В реальном приложении здесь должен быть запрос к API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password })
      // });
      
      // Имитация успешной аутентификации
      const isValid = username.length > 0 && password.length > 0;
      
      if (isValid) {
        // Создание JWT токена (в реальном приложении токен возвращается с сервера)
        const secret = new TextEncoder().encode(
          process.env.NEXT_PUBLIC_JWT_SECRET || 'default_secret_key_for_jwt_please_change_in_production'
        );
        
        // Определение ролей пользователя на основе имени пользователя (для демонстрации)
        let roles = ['user'];
        if (username === 'admin') roles.push('admin');
        if (username.includes('student')) roles.push('student');
        if (username.includes('employer')) roles.push('employer');
        if (username.includes('university')) roles.push('university');
        
        // Срок действия токена - 2 часа
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 2);
        
        // Создание и подписание токена
        const token = await new SignJWT({ username, roles })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime(expiryDate.getTime() / 1000)
          .sign(secret);
        
        // Сохранение токена
        localStorage.setItem('navyk_token', token);
        
        // Обновление состояния безопасности
        setSecurityState(prev => ({
          ...prev,
          currentToken: token,
          isAuthenticated: true,
          userRoles: roles,
          sessionExpiry: expiryDate,
          lastActivity: new Date(),
          securityReport: {
            ...prev.securityReport,
            failedLoginAttempts: 0 // Сброс счетчика неудачных попыток
          }
        }));
        
        return true;
      } else {
        // Увеличение счетчика неудачных попыток входа
        setSecurityState(prev => ({
          ...prev,
          securityReport: {
            ...prev.securityReport,
            failedLoginAttempts: prev.securityReport.failedLoginAttempts + 1,
            suspiciousActivities: [
              ...prev.securityReport.suspiciousActivities,
              {
                id: crypto.randomUUID(),
                timestamp: new Date(),
                type: 'login_attempt',
                source: navigator.userAgent,
                details: `Неудачная попытка входа для пользователя: ${username}`,
                resolved: false
              }
            ],
            threatLevel: prev.securityReport.failedLoginAttempts >= 5 ? 'high' : prev.securityReport.failedLoginAttempts >= 3 ? 'medium' : 'low'
          }
        }));
        
        return false;
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      return false;
    }
  };
  
  // Проверка разрешений пользователя
  const validatePermission = (permission: string): boolean => {
    // Проверка наличия требуемой роли
    return securityState.userRoles.includes(permission);
  };
  
  // Получение CSRF токена
  const getCsrfToken = (): string => {
    return securityState.csrfToken || '';
  };
  
  // Безопасные заголовки для HTTP-запросов
  const secureHeaders: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;",
  };
  
  // Регистрация инцидента безопасности
  const reportIncident = (incidentType: SecurityIncident['type'], details: string) => {
    const newIncident: SecurityIncident = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      type: incidentType,
      source: navigator.userAgent,
      details,
      resolved: false,
    };
    
    // Добавление инцидента в отчет
    setSecurityState(prev => {
      const updatedIncidents = [...prev.securityReport.suspiciousActivities, newIncident];
      
      // Определение уровня угрозы на основе количества и типов инцидентов
      let threatLevel: 'low' | 'medium' | 'high' = 'low';
      const unresolved = updatedIncidents.filter(inc => !inc.resolved);
      
      if (unresolved.length >= 10 || unresolved.filter(inc => inc.type === 'xss_attempt').length >= 3) {
        threatLevel = 'high';
      } else if (unresolved.length >= 5 || unresolved.filter(inc => inc.type === 'csrf_attempt').length >= 2) {
        threatLevel = 'medium';
      }
      
      return {
        ...prev,
        securityReport: {
          ...prev.securityReport,
          suspiciousActivities: updatedIncidents,
          threatLevel
        }
      };
    });
    
    // Если это серьезный инцидент, нужно немедленно уведомить администратора
    if (incidentType === 'xss_attempt' || incidentType === 'csrf_attempt') {
      // В реальном приложении здесь можно отправить уведомление
      console.warn(`Обнаружен серьезный инцидент безопасности: ${incidentType} - ${details}`);
      
      // Показать уведомление в интерфейсе
      toast({
        title: "Предупреждение безопасности",
        description: "Обнаружена подозрительная активность. Администраторы уведомлены.",
        variant: "destructive"
      });
    }
  };
  
  // Разрешение инцидента
  const resolveIncident = (id: string) => {
    setSecurityState(prev => {
      const updatedIncidents = prev.securityReport.suspiciousActivities.map(inc => 
        inc.id === id ? { ...inc, resolved: true } : inc
      );
      
      return {
        ...prev,
        securityReport: {
          ...prev.securityReport,
          suspiciousActivities: updatedIncidents
        }
      };
    });
  };
  
  // Сканирование на уязвимости
  const scanForVulnerabilities = async (): Promise<void> => {
    // В реальном приложении здесь должна быть логика сканирования
    // Имитация процесса сканирования
    
    // Проверка наличия расширений для XSS
    const potentialXssScripts = document.querySelectorAll('script:not([src^="/"]):not([src^="http"])');
    if (potentialXssScripts.length > 0) {
      reportIncident('xss_attempt', `Обнаружены потенциально опасные скрипты: ${potentialXssScripts.length}`);
    }
    
    // Проверка количества запросов (защита от DDOS)
    const now = new Date();
    const requestThreshold = localStorage.getItem('navyk_request_count');
    if (requestThreshold) {
      const [count, timestamp] = requestThreshold.split(':');
      const pastTime = new Date(parseInt(timestamp));
      const timeDiff = now.getTime() - pastTime.getTime();
      
      // Если много запросов за короткое время
      if (timeDiff < 60000 && parseInt(count) > 100) {
        reportIncident('multiple_requests', 'Обнаружено аномальное количество запросов в короткий промежуток времени');
      }
    }
    
    // Обновление отчета о сканировании
    setSecurityState(prev => ({
      ...prev,
      securityReport: {
        ...prev.securityReport,
        lastScan: new Date()
      }
    }));
  };
  
  // Безопасная обертка для fetch
  const secureFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    // Добавление безопасных заголовков
    const headers = new Headers(options.headers);
    
    // Добавление CSRF-токена
    if (securityState.csrfToken) {
      headers.set('X-CSRF-Token', securityState.csrfToken);
    }
    
    // Добавление токена авторизации, если пользователь аутентифицирован
    if (securityState.isAuthenticated && securityState.currentToken) {
      headers.set('Authorization', `Bearer ${securityState.currentToken}`);
    }
    
    // Добавление безопасных заголовков
    Object.entries(secureHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
    
    // Учет количества запросов (для защиты от DDOS)
    const now = new Date();
    const requestThreshold = localStorage.getItem('navyk_request_count');
    
    if (requestThreshold) {
      const [count, timestamp] = requestThreshold.split(':');
      const pastTime = new Date(parseInt(timestamp));
      const timeDiff = now.getTime() - pastTime.getTime();
      
      // Сброс счетчика, если прошло более минуты
      if (timeDiff > 60000) {
        localStorage.setItem('navyk_request_count', `1:${now.getTime()}`);
      } else {
        // Увеличение счетчика запросов
        localStorage.setItem('navyk_request_count', `${parseInt(count) + 1}:${timestamp}`);
        
        // Защита от большого количества запросов
        if (parseInt(count) > 100) {
          reportIncident('multiple_requests', 'Обнаружено аномальное количество запросов в короткий промежуток времени');
          throw new Error('Слишком много запросов. Пожалуйста, подождите некоторое время и повторите попытку.');
        }
      }
    } else {
      localStorage.setItem('navyk_request_count', `1:${now.getTime()}`);
    }
    
    // Выполнение запроса с обновленными заголовками
    return fetch(url, {
      ...options,
      headers,
    });
  };
  
  // Формирование контекста безопасности
  const contextValue: SecurityContextType = {
    ...securityState,
    login,
    logout,
    refreshToken,
    validatePermission,
    getCsrfToken,
    secureHeaders,
    reportIncident,
    resolveIncident,
    scanForVulnerabilities,
    secureFetch
  };
  
  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  );
};

// Компонент для защиты страниц, требующих аутентификации
export const ProtectedRoute = ({ 
  children, 
  requiredPermissions = [] 
}: { 
  children: ReactNode, 
  requiredPermissions?: string[] 
}) => {
  const { isAuthenticated, validatePermission, logout } = useSecurity();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    
    // Проверка разрешений
    if (requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission => 
        validatePermission(permission)
      );
      
      if (!hasAllPermissions) {
        // Перенаправление на страницу с ошибкой доступа
        router.push('/access-denied');
        return;
      }
    }
  }, [isAuthenticated, pathname, requiredPermissions, router, validatePermission, logout]);
  
  // Если пользователь не аутентифицирован или не имеет требуемых разрешений, не рендерим содержимое
  if (!isAuthenticated) {
    return null;
  }
  
  // Проверка разрешений
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => 
      validatePermission(permission)
    );
    
    if (!hasAllPermissions) {
      return null;
    }
  }
  
  return <>{children}</>;
};

// Хелперы для работы с безопасностью
export const sanitizeInput = (input: string): string => {
  // Простой пример санитизации ввода (в реальном приложении нужно использовать более надежные библиотеки)
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;')
    .replace(/\(\)/g, '&#40;&#41;');
};

export const validateInput = (input: string, pattern: RegExp): boolean => {
  return pattern.test(input);
};

// Константы для регулярных выражений проверки ввода
export const INPUT_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  PHONE: /^\+?[0-9]{10,15}$/,
};

// Проверка на распространенные XSS-скрипты
export const containsXssScripts = (input: string): boolean => {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:[^\s]*/gi,
    /onerror\s*=\s*/gi,
    /onclick\s*=\s*/gi,
    /onload\s*=\s*/gi,
    /eval\s*\(/gi,
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
};

// Проверка на распространенные SQL-инъекции
export const containsSqlInjection = (input: string): boolean => {
  const sqlPatterns = [
    /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER)\b/gi,
    /\b(UNION|JOIN)\b\s+\b(SELECT)\b/gi,
    /--/g,
    /\b(OR|AND)\b\s+\b\d+\s*=\s*\d+\b/gi,
    /\b(OR|AND)\b\s+\b(TRUE|FALSE)\b/gi,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};

// Проверка безопасности пароля
export const isPasswordStrong = (password: string): boolean => {
  // Пароль должен быть не менее 8 символов и содержать:
  // - хотя бы одну заглавную букву
  // - хотя бы одну строчную букву
  // - хотя бы одну цифру
  // - хотя бы один специальный символ
  return INPUT_PATTERNS.PASSWORD.test(password);
};

// Проверка наличия заголовков безопасности в ответе
export const checkSecurityHeaders = (headers: Headers): { secure: boolean, missing: string[] } => {
  const requiredHeaders = [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Content-Security-Policy',
    'Strict-Transport-Security',
  ];
  
  const missing = requiredHeaders.filter(header => !headers.has(header));
  
  return {
    secure: missing.length === 0,
    missing,
  };
};

// Дополнительная функция для защиты от атак повторного воспроизведения
export const generateRequestSignature = (payload: any, timestamp: number, token: string): string => {
  const data = JSON.stringify(payload) + timestamp + token;
  // В реальном приложении здесь должен быть более надежный алгоритм хеширования
  return btoa(data);
};