'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  User,
  UserCheck,
  Clock,
  X,
  Check
} from 'lucide-react';

// Имитация данных безопасности для демонстрации
interface SecurityIncident {
  id: string;
  timestamp: Date;
  type: string;
  source: string;
  details: string;
  resolved: boolean;
}

interface SecurityData {
  securityScore: number;
  failedLoginAttempts: number;
  activeUsers: number;
  incidents: SecurityIncident[];
  lastScanTime: Date | null;
  securityUpdates: boolean;
  threatLevel: 'low' | 'medium' | 'high';
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  };
}

export default function SecurityMonitor() {
  const [securityData, setSecurityData] = useState<SecurityData>({
    securityScore: 87,
    failedLoginAttempts: 5,
    activeUsers: 23,
    incidents: [],
    lastScanTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 часа назад
    securityUpdates: true,
    threatLevel: 'low',
    vulnerabilities: {
      critical: 0,
      high: 1,
      medium: 3,
      low: 5,
      total: 9
    }
  });
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [incidentFilter, setIncidentFilter] = useState('all');
  const { toast } = useToast();
  
  // Загрузка данных инцидентов
  useEffect(() => {
    // Имитация загрузки данных об инцидентах с сервера
    const mockIncidents: SecurityIncident[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
        type: 'login_attempt',
        source: 'IP: 192.168.1.1',
        details: 'Несколько неудачных попыток входа для пользователя admin',
        resolved: true
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        type: 'xss_attempt',
        source: 'IP: 74.125.224.72',
        details: 'Попытка XSS-инъекции в форме комментария',
        resolved: false
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        type: 'csrf_attempt',
        source: 'IP: 157.240.2.35',
        details: 'Попытка CSRF-атаки при изменении настроек пользователя',
        resolved: false
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        type: 'unusual_activity',
        source: 'IP: 8.8.8.8',
        details: 'Доступ к API с необычно высокой частотой запросов',
        resolved: true
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'multiple_requests',
        source: 'IP: 185.60.216.35',
        details: 'Обнаружено более 1000 запросов за минуту с одного IP',
        resolved: false
      },
    ];
    
    setSecurityData(prev => ({
      ...prev,
      incidents: mockIncidents
    }));
  }, []);
  
  // Запуск сканирования безопасности
  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Имитация процесса сканирования
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Обновление данных после сканирования
          setSecurityData(prev => ({
            ...prev,
            lastScanTime: new Date(),
            securityScore: Math.min(100, prev.securityScore + Math.floor(Math.random() * 5)),
            vulnerabilities: {
              critical: 0,
              high: Math.max(0, prev.vulnerabilities.high - 1),
              medium: prev.vulnerabilities.medium,
              low: prev.vulnerabilities.low,
              total: Math.max(0, prev.vulnerabilities.total - 1)
            }
          }));
          
          toast({
            title: "Сканирование завершено",
            description: "Сканирование безопасности системы успешно завершено",
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
    
    return () => clearInterval(interval);
  };
  
  // Обработка разрешения инцидента
  const handleResolveIncident = (id: string) => {
    setSecurityData(prev => ({
      ...prev,
      incidents: prev.incidents.map(incident => 
        incident.id === id ? { ...incident, resolved: true } : incident
      )
    }));
    
    toast({
      title: "Инцидент разрешен",
      description: "Инцидент безопасности был отмечен как разрешенный",
    });
  };
  
  // Подсчет статистики по инцидентам
  const incidentStats = {
    total: securityData.incidents.length,
    resolved: securityData.incidents.filter(i => i.resolved).length,
    unresolved: securityData.incidents.filter(i => !i.resolved).length,
    byType: {
      login_attempt: securityData.incidents.filter(i => i.type === 'login_attempt').length,
      xss_attempt: securityData.incidents.filter(i => i.type === 'xss_attempt').length,
      csrf_attempt: securityData.incidents.filter(i => i.type === 'csrf_attempt').length,
      unusual_activity: securityData.incidents.filter(i => i.type === 'unusual_activity').length,
      multiple_requests: securityData.incidents.filter(i => i.type === 'multiple_requests').length,
    }
  };
  
  // Фильтрация инцидентов для отображения
  const filteredIncidents = securityData.incidents.filter(incident => 
    incidentFilter === 'all' || 
    (incidentFilter === 'resolved' && incident.resolved) ||
    (incidentFilter === 'unresolved' && !incident.resolved) ||
    incident.type === incidentFilter
  );
  
  // Получение цвета для уровня угрозы
  const getThreatLevelColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Получение названия типа инцидента на русском
  const getIncidentTypeName = (type: string) => {
    switch (type) {
      case 'login_attempt': return 'Попытка входа';
      case 'xss_attempt': return 'XSS-инъекция';
      case 'csrf_attempt': return 'CSRF-атака';
      case 'unusual_activity': return 'Необычная активность';
      case 'multiple_requests': return 'Множественные запросы';
      default: return type;
    }
  };
  
  // Получение иконки для типа инцидента
  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'login_attempt': return <User className="h-4 w-4 text-yellow-500" />;
      case 'xss_attempt': return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case 'csrf_attempt': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'unusual_activity': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'multiple_requests': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Мониторинг безопасности</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Отслеживайте угрозы и состояние безопасности вашей платформы
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {securityData.lastScanTime ? 
              `Последнее сканирование: ${securityData.lastScanTime.toLocaleString()}` : 
              'Сканирование не проводилось'}
          </span>
          <Button 
            onClick={handleStartScan} 
            disabled={isScanning}
            className="flex items-center gap-2"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Сканирование...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Запустить сканирование
              </>
            )}
          </Button>
        </div>
      </div>
      
      {isScanning && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Прогресс сканирования</span>
            <span className="text-sm">{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} className="h-2" />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Оценка безопасности 
              <Badge className={
                securityData.securityScore >= 80 ? 'bg-green-500' : 
                securityData.securityScore >= 60 ? 'bg-yellow-500' : 
                'bg-red-500'
              }>
                {securityData.securityScore}/100
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div 
                  style={{ width: `${securityData.securityScore}%` }} 
                  className={
                    securityData.securityScore >= 80 ? 'bg-green-500' : 
                    securityData.securityScore >= 60 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }
                ></div>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {securityData.securityScore >= 80 ? 'Хороший уровень защиты' : 
               securityData.securityScore >= 60 ? 'Требуются некоторые улучшения' : 
               'Критические проблемы безопасности'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Уровень угрозы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge className={getThreatLevelColor(securityData.threatLevel)}>
                {securityData.threatLevel === 'low' ? 'Низкий' : 
                 securityData.threatLevel === 'medium' ? 'Средний' : 
                 'Высокий'}
              </Badge>
              {securityData.threatLevel === 'low' ? (
                <ShieldCheck className="h-8 w-8 text-green-500" />
              ) : securityData.threatLevel === 'medium' ? (
                <Shield className="h-8 w-8 text-yellow-500" />
              ) : (
                <ShieldAlert className="h-8 w-8 text-red-500" />
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {securityData.threatLevel === 'low' ? 'Нет активных угроз' : 
               securityData.threatLevel === 'medium' ? 'Обнаружены потенциальные угрозы' : 
               'Обнаружены серьезные угрозы'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Уязвимости</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Критические</span>
                <Badge variant="outline" className="text-red-500 border-red-500 mt-1 w-fit">
                  {securityData.vulnerabilities.critical}
                </Badge>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Высокие</span>
                <Badge variant="outline" className="text-orange-500 border-orange-500 mt-1 w-fit">
                  {securityData.vulnerabilities.high}
                </Badge>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Средние</span>
                <Badge variant="outline" className="text-yellow-500 border-yellow-500 mt-1 w-fit">
                  {securityData.vulnerabilities.medium}
                </Badge>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Низкие</span>
                <Badge variant="outline" className="text-green-500 border-green-500 mt-1 w-fit">
                  {securityData.vulnerabilities.low}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Статистика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Активные пользователи</span>
                <span className="font-medium">{securityData.activeUsers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Неудачные входы</span>
                <span className="font-medium">{securityData.failedLoginAttempts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Нерешенные инциденты</span>
                <span className="font-medium">{incidentStats.unresolved}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {securityData.securityUpdates && (
        <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertTitle>Доступны обновления безопасности</AlertTitle>
          <AlertDescription>
            Для улучшения безопасности системы рекомендуется установить последние обновления безопасности.
          </AlertDescription>
          <Button variant="outline" size="sm" className="mt-2">Установить обновления</Button>
        </Alert>
      )}
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Инциденты безопасности</CardTitle>
          <CardDescription>
            Отслеживайте и управляйте инцидентами безопасности на платформе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge 
              variant={incidentFilter === 'all' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => setIncidentFilter('all')}
            >
              Все ({incidentStats.total})
            </Badge>
            <Badge 
              variant={incidentFilter === 'unresolved' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => setIncidentFilter('unresolved')}
            >
              Нерешенные ({incidentStats.unresolved})
            </Badge>
            <Badge 
              variant={incidentFilter === 'resolved' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => setIncidentFilter('resolved')}
            >
              Решенные ({incidentStats.resolved})
            </Badge>
            <Badge 
              variant={incidentFilter === 'login_attempt' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => setIncidentFilter('login_attempt')}
            >
              Попытки входа ({incidentStats.byType.login_attempt})
            </Badge>
            <Badge 
              variant={incidentFilter === 'xss_attempt' ? 'default' : 'outline'} 
              className="cursor-pointer text-red-500 border-red-500"
              onClick={() => setIncidentFilter('xss_attempt')}
            >
              XSS-атаки ({incidentStats.byType.xss_attempt})
            </Badge>
            <Badge 
              variant={incidentFilter === 'csrf_attempt' ? 'default' : 'outline'} 
              className="cursor-pointer text-red-500 border-red-500"
              onClick={() => setIncidentFilter('csrf_attempt')}
            >
              CSRF-атаки ({incidentStats.byType.csrf_attempt})
            </Badge>
            <Badge 
              variant={incidentFilter === 'unusual_activity' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => setIncidentFilter('unusual_activity')}
            >
              Необычная активность ({incidentStats.byType.unusual_activity})
            </Badge>
          </div>
          
          <div className="space-y-4">
            {filteredIncidents.length === 0 ? (
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Инциденты не найдены</p>
              </div>
            ) : (
              filteredIncidents.map(incident => (
                <div 
                  key={incident.id} 
                  className="p-4 border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <div className="flex items-center gap-2 mb-2 md:mb-0">
                      {getIncidentIcon(incident.type)}
                      <span className="font-medium">{getIncidentTypeName(incident.type)}</span>
                      {incident.resolved ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Решен</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Не решен</Badge>
                      )}
                    </div>
                    {!incident.resolved && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleResolveIncident(incident.id)}
                        className="flex items-center gap-1"
                      >
                        <Check className="h-4 w-4 text-green-500" />
                        Отметить как решенный
                      </Button>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>{incident.details}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {incident.source}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {incident.timestamp.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Найдено: {filteredIncidents.length} из {securityData.incidents.length}
          </div>
          {filteredIncidents.length > 0 && filteredIncidents.length < securityData.incidents.length && (
            <Button variant="ghost" size="sm" onClick={() => setIncidentFilter("all")}>
              Сбросить фильтры
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Рекомендации по безопасности</CardTitle>
          <CardDescription>
            Следуйте этим рекомендациям для улучшения безопасности системы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="font-medium">Используйте двухфакторную аутентификацию</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Настройте двухфакторную аутентификацию для всех администраторов и ключевых пользователей платформы.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Регулярно обновляйте библиотеки</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                В вашей системе есть несколько устаревших зависимостей, которые следует обновить для устранения уязвимостей.
              </p>
              <Button variant="outline" size="sm" className="mt-2">Проверить зависимости</Button>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Настройте заголовки безопасности</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Добавьте дополнительные заголовки безопасности, такие как Content-Security-Policy и Strict-Transport-Security.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20 border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="h-5 w-5 text-purple-500" />
                <span className="font-medium">Проверьте разрешения пользователей</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Рекомендуется регулярно проверять и обновлять разрешения пользователей, чтобы предотвратить несанкционированный доступ.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 