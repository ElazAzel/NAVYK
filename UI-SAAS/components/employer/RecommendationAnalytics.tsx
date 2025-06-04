"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, Download } from "lucide-react";
import { recommendationAnalytics } from "@/app/lib/analytics/recommendations";

interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  totalApplications: number;
  conversionRate: number;
  topRecommendations: Array<{
    id: string;
    title: string;
    views: number;
    clicks: number;
    applications: number;
  }>;
  userEngagement: {
    activeUsers: number;
    averageSessionDuration: string;
    bounceRate: number;
  };
  timeDistribution: {
    morning: number;
    afternoon: number;
    evening: number;
  };
}

export default function RecommendationAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const searchParams = new URLSearchParams({
          startDate: dateRange.from.toISOString(),
          endDate: dateRange.to.toISOString()
        });

        const response = await fetch(
          `/api/analytics/recommendations?${searchParams}`
        );
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Ошибка при загрузке аналитики:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange]);

  const exportAnalytics = () => {
    if (!analyticsData) return;

    const csvContent = [
      ["Метрика", "Значение"],
      ["Всего просмотров", analyticsData.totalViews],
      ["Всего кликов", analyticsData.totalClicks],
      ["Всего откликов", analyticsData.totalApplications],
      ["Конверсия", `${analyticsData.conversionRate}%`]
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `analytics_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Аналитика рекомендаций
          </h2>
          <p className="text-muted-foreground">
            Статистика и инсайты по вашим рекомендациям
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {format(dateRange.from, "d MMM", { locale: ru })} -{" "}
              {format(dateRange.to, "d MMM", { locale: ru })}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={exportAnalytics}
          >
            <Download className="h-4 w-4" />
            Экспорт
          </Button>
        </div>
      </div>

      {analyticsData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Всего просмотров
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.totalViews.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% к прошлому периоду
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Всего кликов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.totalClicks.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  CTR: {(analyticsData.totalClicks / analyticsData.totalViews * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Всего откликов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.totalApplications.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Конверсия: {analyticsData.conversionRate}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Активные пользователи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.userEngagement.activeUsers.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Среднее время: {analyticsData.userEngagement.averageSessionDuration}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Тренды просмотров</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { date: "2023-05-01", views: 100 },
                      { date: "2023-05-02", views: 120 },
                      { date: "2023-05-03", views: 150 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#8884d8"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Популярные рекомендации</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topRecommendations.map((rec) => (
                    <div key={rec.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{rec.title}</span>
                        <Badge variant="secondary">
                          {rec.applications} откликов
                        </Badge>
                      </div>
                      <Progress
                        value={(rec.applications / rec.views) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{rec.views} просмотров</span>
                        <span>{rec.clicks} кликов</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Распределение по времени</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { time: "Утро", value: analyticsData.timeDistribution.morning },
                    { time: "День", value: analyticsData.timeDistribution.afternoon },
                    { time: "Вечер", value: analyticsData.timeDistribution.evening }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}