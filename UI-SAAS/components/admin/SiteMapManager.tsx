"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Edit, Plus, Trash2, ArrowDown, ArrowUp, RefreshCw, Save, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Основные типы для карты сайта
interface SiteMapItem {
  id: string;
  route: string;
  priority: number;
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  status: 'active' | 'draft' | 'archived';
  accessLevel: 'public' | 'authenticated' | 'admin';
  lastModified: string;
  category: string;
}

// Группа маршрутов
interface RouteGroup {
  name: string;
  routes: SiteMapItem[];
}

export default function SiteMapManager() {
  const [siteMap, setSiteMap] = useState<SiteMapItem[]>([]);
  const [filteredMap, setFilteredMap] = useState<SiteMapItem[]>([]);
  const [groups, setGroups] = useState<RouteGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<SiteMapItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { toast } = useToast();
  
  // Имитация загрузки данных с сервера
  useEffect(() => {
    const loadSiteMap = async () => {
      try {
        setIsLoading(true);
        
        // В реальной системе здесь был бы запрос к API
        // const response = await fetch('/api/admin/sitemap');
        // const data = await response.json();
        
        // Имитация задержки запроса
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Тестовые данные
        const mockData: SiteMapItem[] = [
          { id: '1', route: '/', priority: 1.0, changeFreq: 'daily', status: 'active', accessLevel: 'public', lastModified: new Date().toISOString(), category: 'Общие' },
          { id: '2', route: '/about', priority: 0.8, changeFreq: 'monthly', status: 'active', accessLevel: 'public', lastModified: new Date().toISOString(), category: 'Общие' },
          { id: '3', route: '/contact', priority: 0.7, changeFreq: 'monthly', status: 'active', accessLevel: 'public', lastModified: new Date().toISOString(), category: 'Общие' },
          { id: '4', route: '/improvements', priority: 0.9, changeFreq: 'weekly', status: 'active', accessLevel: 'public', lastModified: new Date().toISOString(), category: 'Общие' },
          { id: '5', route: '/login', priority: 0.7, changeFreq: 'monthly', status: 'active', accessLevel: 'public', lastModified: new Date().toISOString(), category: 'Аутентификация' },
          { id: '6', route: '/signup', priority: 0.7, changeFreq: 'monthly', status: 'active', accessLevel: 'public', lastModified: new Date().toISOString(), category: 'Аутентификация' },
          { id: '7', route: '/students/profile', priority: 0.9, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Студенты' },
          { id: '8', route: '/students/roadmap', priority: 0.8, changeFreq: 'weekly', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Студенты' },
          { id: '9', route: '/students/courses', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Студенты' },
          { id: '10', route: '/students/events', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Студенты' },
          { id: '11', route: '/students/jobs', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Студенты' },
          { id: '12', route: '/students/analytics', priority: 0.7, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Студенты' },
          { id: '13', route: '/employers/dashboard', priority: 0.9, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Работодатели' },
          { id: '14', route: '/employers/jobs', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Работодатели' },
          { id: '15', route: '/employers/candidates', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Работодатели' },
          { id: '16', route: '/employers/analytics', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Работодатели' },
          { id: '17', route: '/employers/events', priority: 0.7, changeFreq: 'weekly', status: 'draft', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Работодатели' },
          { id: '18', route: '/universities/dashboard', priority: 0.9, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Университеты' },
          { id: '19', route: '/universities/students', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Университеты' },
          { id: '20', route: '/universities/courses', priority: 0.8, changeFreq: 'weekly', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Университеты' },
          { id: '21', route: '/universities/analytics', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Университеты' },
          { id: '22', route: '/universities/events', priority: 0.7, changeFreq: 'weekly', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Университеты' },
          { id: '23', route: '/mentors/dashboard', priority: 0.9, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Менторы' },
          { id: '24', route: '/mentors/students', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Менторы' },
          { id: '25', route: '/mentors/sessions', priority: 0.8, changeFreq: 'daily', status: 'active', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Менторы' },
          { id: '26', route: '/mentors/analytics', priority: 0.7, changeFreq: 'weekly', status: 'draft', accessLevel: 'authenticated', lastModified: new Date().toISOString(), category: 'Менторы' },
          { id: '27', route: '/admin/dashboard', priority: 0.5, changeFreq: 'daily', status: 'active', accessLevel: 'admin', lastModified: new Date().toISOString(), category: 'Администрирование' },
          { id: '28', route: '/admin/users', priority: 0.5, changeFreq: 'daily', status: 'active', accessLevel: 'admin', lastModified: new Date().toISOString(), category: 'Администрирование' },
          { id: '29', route: '/admin/settings', priority: 0.5, changeFreq: 'monthly', status: 'active', accessLevel: 'admin', lastModified: new Date().toISOString(), category: 'Администрирование' },
          { id: '30', route: '/admin/sitemap', priority: 0.4, changeFreq: 'monthly', status: 'active', accessLevel: 'admin', lastModified: new Date().toISOString(), category: 'Администрирование' },
          { id: '31', route: '/blog', priority: 0.8, changeFreq: 'weekly', status: 'draft', accessLevel: 'public', lastModified: new Date().toISOString(), category: 'Блог' },
          { id: '32', route: '/faq', priority: 0.7, changeFreq: 'monthly', status: 'archived', accessLevel: 'public', lastModified: new Date().toISOString(), category: 'Общие' },
        ];
        
        setSiteMap(mockData);
        setFilteredMap(mockData);
        
        // Группировка маршрутов по категориям
        const groupNames = Array.from(new Set(mockData.map(item => item.category)));
        const groupedRoutes = groupNames.map(name => ({
          name,
          routes: mockData.filter(item => item.category === name)
        }));
        
        setGroups(groupedRoutes);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки карты сайта:', error);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить карту сайта. Пожалуйста, попробуйте позже.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    loadSiteMap();
  }, [toast]);
  
  // Фильтрация маршрутов при изменении фильтров
  useEffect(() => {
    let filtered = [...siteMap];
    
    // Фильтр по поисковому запросу
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.route.toLowerCase().includes(lowerSearchTerm) || 
        item.category.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Фильтр по статусу
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // Фильтр по категории (вкладке)
    if (activeTab !== "all") {
      filtered = filtered.filter(item => item.category === activeTab);
    }
    
    setFilteredMap(filtered);
  }, [siteMap, searchTerm, statusFilter, activeTab]);
  
  // Обработчик сохранения изменений
  const handleSave = async (item: SiteMapItem) => {
    try {
      // В реальной системе здесь был бы запрос к API
      // await fetch(`/api/admin/sitemap/${item.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(item)
      // });
      
      // Имитация задержки запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Обновляем состояние
      setSiteMap(prev => prev.map(i => i.id === item.id ? { ...item, lastModified: new Date().toISOString() } : i));
      setEditingItem(null);
      
      toast({
        title: "Изменения сохранены",
        description: `Маршрут ${item.route} был обновлен`,
      });
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      toast({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить изменения. Пожалуйста, попробуйте позже.",
        variant: "destructive"
      });
    }
  };
  
  // Обработчик удаления маршрута
  const handleDelete = async (id: string) => {
    try {
      // В реальной системе здесь был бы запрос к API
      // await fetch(`/api/admin/sitemap/${id}`, {
      //   method: 'DELETE'
      // });
      
      // Имитация задержки запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Обновляем состояние
      const deletedItem = siteMap.find(item => item.id === id);
      setSiteMap(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Маршрут удален",
        description: `Маршрут ${deletedItem?.route} был успешно удален`,
      });
    } catch (error) {
      console.error('Ошибка удаления:', error);
      toast({
        title: "Ошибка удаления",
        description: "Не удалось удалить маршрут. Пожалуйста, попробуйте позже.",
        variant: "destructive"
      });
    }
  };
  
  // Обработчик изменения статуса
  const handleStatusChange = async (id: string, status: 'active' | 'draft' | 'archived') => {
    try {
      // В реальной системе здесь был бы запрос к API
      // await fetch(`/api/admin/sitemap/${id}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status })
      // });
      
      // Имитация задержки запроса
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Обновляем состояние
      setSiteMap(prev => prev.map(item => 
        item.id === id ? { ...item, status, lastModified: new Date().toISOString() } : item
      ));
      
      const item = siteMap.find(item => item.id === id);
      
      toast({
        title: "Статус обновлен",
        description: `Маршрут ${item?.route} теперь имеет статус "${status}"`,
      });
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      toast({
        title: "Ошибка обновления",
        description: "Не удалось обновить статус маршрута. Пожалуйста, попробуйте позже.",
        variant: "destructive"
      });
    }
  };
  
  // Обработчик создания нового маршрута
  const handleAddNew = () => {
    const newItem: SiteMapItem = {
      id: `new-${Date.now()}`,
      route: '/new-route',
      priority: 0.5,
      changeFreq: 'weekly',
      status: 'draft',
      accessLevel: 'public',
      lastModified: new Date().toISOString(),
      category: 'Общие'
    };
    
    setSiteMap(prev => [...prev, newItem]);
    setEditingItem(newItem);
    
    // Прокрутка к новому элементу
    setTimeout(() => {
      const element = document.getElementById(`route-${newItem.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };
  
  // Генерация файла sitemap.xml
  const handleGenerateSitemap = async () => {
    try {
      setIsGenerating(true);
      
      // В реальной системе здесь был бы запрос к API
      // await fetch('/api/admin/sitemap/generate', { method: 'POST' });
      
      // Имитация задержки запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Карта сайта создана",
        description: "Файл sitemap.xml успешно сгенерирован и размещен в корне сайта",
      });
      
      setIsGenerating(false);
    } catch (error) {
      console.error('Ошибка генерации карты сайта:', error);
      toast({
        title: "Ошибка генерации",
        description: "Не удалось сгенерировать файл sitemap.xml. Пожалуйста, попробуйте позже.",
        variant: "destructive"
      });
      setIsGenerating(false);
    }
  };
  
  // Отображение статуса
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Активно</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500">Черновик</Badge>;
      case 'archived':
        return <Badge className="bg-gray-500">Архив</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Отображение уровня доступа
  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case 'public':
        return <Badge variant="outline" className="border-green-500 text-green-700">Публичный</Badge>;
      case 'authenticated':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Только авторизованные</Badge>;
      case 'admin':
        return <Badge variant="outline" className="border-purple-500 text-purple-700">Только администраторы</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-lg font-medium">Загрузка карты сайта...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold mb-1">Управление картой сайта</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Отслеживайте структуру сайта и управляйте индексацией страниц
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleGenerateSitemap} 
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Генерация...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Сгенерировать sitemap.xml
              </>
            )}
          </Button>
          <Button 
            onClick={handleAddNew} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Добавить маршрут
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Поиск по маршруту или категории..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="draft">Черновики</SelectItem>
              <SelectItem value="archived">Архивные</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Alert className="mb-6">
        <AlertTitle>Информация о карте сайта</AlertTitle>
        <AlertDescription>
          Всего маршрутов: <strong>{siteMap.length}</strong>,
          Активных: <strong>{siteMap.filter(item => item.status === 'active').length}</strong>,
          Черновиков: <strong>{siteMap.filter(item => item.status === 'draft').length}</strong>,
          Архивных: <strong>{siteMap.filter(item => item.status === 'archived').length}</strong>
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex flex-wrap">
          <TabsTrigger value="all" className="min-w-20">Все</TabsTrigger>
          {groups.map(group => (
            <TabsTrigger key={group.name} value={group.name} className="min-w-20">
              {group.name}
              <Badge className="ml-2 bg-gray-200 text-gray-800">{group.routes.length}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Маршруты{activeTab !== 'all' ? `: ${activeTab}` : ''}</CardTitle>
              <CardDescription>
                {filteredMap.length} {filteredMap.length === 1 ? 'маршрут' : 
                  filteredMap.length > 1 && filteredMap.length < 5 ? 'маршрута' : 'маршрутов'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMap.length === 0 ? (
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">Маршруты не найдены</p>
                  </div>
                ) : (
                  filteredMap.map(item => (
                    <div 
                      key={item.id} 
                      id={`route-${item.id}`}
                      className="p-4 border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      {editingItem && editingItem.id === item.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-1 block">Маршрут</label>
                              <Input 
                                value={editingItem.route} 
                                onChange={e => setEditingItem({ ...editingItem, route: e.target.value })}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">Категория</label>
                              <Select 
                                value={editingItem.category} 
                                onValueChange={(value: string) => setEditingItem({ ...editingItem, category: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Категория" />
                                </SelectTrigger>
                                <SelectContent>
                                  {groups.map(group => (
                                    <SelectItem key={group.name} value={group.name}>{group.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-1 block">Приоритет</label>
                              <Select 
                                value={editingItem.priority.toString()} 
                                onValueChange={(value: string) => setEditingItem({ ...editingItem, priority: parseFloat(value) })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Приоритет" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1.0">1.0 - Наивысший</SelectItem>
                                  <SelectItem value="0.9">0.9 - Очень высокий</SelectItem>
                                  <SelectItem value="0.8">0.8 - Высокий</SelectItem>
                                  <SelectItem value="0.7">0.7 - Средне-высокий</SelectItem>
                                  <SelectItem value="0.6">0.6 - Выше среднего</SelectItem>
                                  <SelectItem value="0.5">0.5 - Средний</SelectItem>
                                  <SelectItem value="0.4">0.4 - Ниже среднего</SelectItem>
                                  <SelectItem value="0.3">0.3 - Низкий</SelectItem>
                                  <SelectItem value="0.2">0.2 - Очень низкий</SelectItem>
                                  <SelectItem value="0.1">0.1 - Минимальный</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">Частота изменений</label>
                              <Select 
                                value={editingItem.changeFreq} 
                                onValueChange={(value: string) => setEditingItem({ 
                                  ...editingItem, 
                                  changeFreq: value as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Частота изменений" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="always">Всегда</SelectItem>
                                  <SelectItem value="hourly">Ежечасно</SelectItem>
                                  <SelectItem value="daily">Ежедневно</SelectItem>
                                  <SelectItem value="weekly">Еженедельно</SelectItem>
                                  <SelectItem value="monthly">Ежемесячно</SelectItem>
                                  <SelectItem value="yearly">Ежегодно</SelectItem>
                                  <SelectItem value="never">Никогда</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">Уровень доступа</label>
                              <Select 
                                value={editingItem.accessLevel} 
                                onValueChange={(value: string) => setEditingItem({ 
                                  ...editingItem, 
                                  accessLevel: value as 'public' | 'authenticated' | 'admin'
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Уровень доступа" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="public">Публичный</SelectItem>
                                  <SelectItem value="authenticated">Авторизованные</SelectItem>
                                  <SelectItem value="admin">Администраторы</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setEditingItem(null)}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Отмена
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm" 
                              onClick={() => handleSave(editingItem)}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Сохранить
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col md:flex-row justify-between mb-2">
                            <div className="flex items-center gap-2 mb-2 md:mb-0">
                              <span className="font-medium text-lg">{item.route}</span>
                              {getStatusBadge(item.status)}
                              {getAccessLevelBadge(item.accessLevel)}
                            </div>
                            <div className="flex space-x-1">
                              {item.status !== 'active' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleStatusChange(item.id, 'active')}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setEditingItem(item)}
                              >
                                <Edit className="h-4 w-4 text-blue-500" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDelete(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div>
                              <span className="font-medium mr-2">Категория:</span> 
                              {item.category}
                            </div>
                            <div>
                              <span className="font-medium mr-2">Приоритет:</span> 
                              {item.priority}
                            </div>
                            <div>
                              <span className="font-medium mr-2">Частота обновления:</span> 
                              {item.changeFreq === 'daily' ? 'Ежедневно' : 
                                item.changeFreq === 'weekly' ? 'Еженедельно' : 
                                item.changeFreq === 'monthly' ? 'Ежемесячно' : 
                                item.changeFreq === 'yearly' ? 'Ежегодно' : 
                                item.changeFreq === 'always' ? 'Всегда' : 
                                item.changeFreq === 'hourly' ? 'Ежечасно' : 
                                item.changeFreq === 'never' ? 'Никогда' : item.changeFreq}
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                            Последнее изменение: {new Date(item.lastModified).toLocaleString()}
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Найдено: {filteredMap.length} из {siteMap.length}
              </div>
              {filteredMap.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setSearchTerm("")}>
                  Сбросить фильтры
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 