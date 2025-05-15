"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import {
  Brain,
  Save,
  RefreshCw,
  Upload,
  Download,
  TrendingUp,
  Users,
  Target,
  DollarSign
} from "lucide-react";
import { modelTrainer } from "@/app/lib/ml/model-trainer";
import { recommendationMetrics } from "@/app/lib/analytics/recommendation-metrics";
import { useToast } from "@/components/ui/use-toast";
import { Recommendation } from "@/app/lib/types/recommendations";

export default function MLModelManagement() {
  const [modelStatus, setModelStatus] = React.useState<any>(null);
  const [trainingMetrics, setTrainingMetrics] = React.useState<any>(null);
  const [isTraining, setIsTraining] = React.useState(false);
  const [metricsData, setMetricsData] = React.useState<any>(null);
  const { toast } = useToast();

  const fetchModelStatus = React.useCallback(async () => {
    try {
      const status = await modelTrainer.getModelStatus();
      setModelStatus(status);
    } catch (error) {
      console.error("Ошибка при получении статуса модели:", error);
    }
  }, []);

  const fetchMetricsData = React.useCallback(async () => {
    try {
      const mockRecommendations: Recommendation[] = [];
      const mockContext = {
        relevanceScores: [1, 0.8, 0.6, 0.4, 0.2],
        relevantItems: new Set(["1", "2", "3"]),
        totalItems: 100,
        userInterests: new Set(["JavaScript", "React", "TypeScript"]),
        userHistory: new Set(["1", "2"]),
        timeRange: {
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          end: new Date()
        }
      };

      const metrics = await recommendationMetrics.generateMetricsReport(
        mockRecommendations,
        mockContext
      );
      setMetricsData(metrics);
    } catch (error) {
      console.error("Ошибка при загрузке метрик:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchModelStatus();
    fetchMetricsData();
  }, [fetchModelStatus, fetchMetricsData]);

  const handleStartTraining = async () => {
    try {
      setIsTraining(true);

      const mockTrainingData: Recommendation[] = [];
      const mockValidationData: Recommendation[] = [];

      const result = await modelTrainer.trainModel(
        mockTrainingData,
        mockValidationData,
        {
          epochs: 10,
          batchSize: 32,
          validationSplit: 0.2
        }
      );

      setTrainingMetrics(result.metrics);

      toast({
        title: "Обучение завершено",
        description: `Точность: ${result.metrics.accuracy.toFixed(2)}`
      });
    } catch (error) {
      console.error("Ошибка при обучении модели:", error);
      toast({
        title: "Ошибка обучения",
        description: "Не удалось обучить модель",
        variant: "destructive"
      });
    } finally {
      setIsTraining(false);
      fetchModelStatus();
    }
  };

  const handleSaveModel = async () => {
    try {
      await modelTrainer.saveModel("/models/recommendation-model");
      toast({
        title: "Модель сохранена",
        description: "Модель успешно сохранена на диск"
      });
    } catch (error) {
      console.error("Ошибка при сохранении модели:", error);
      toast({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить модель",
        variant: "destructive"
      });
    }
  };

  const handleLoadModel = async () => {
    try {
      await modelTrainer.loadModel("/models/recommendation-model");
      toast({
        title: "Модель загружена",
        description: "Модель успешно загружена"
      });
      fetchModelStatus();
    } catch (error) {
      console.error("Ошибка при загрузке модели:", error);
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить модель",
        variant: "destructive"
      });
    }
  };

  const generateReport = async () => {
    try {
      const report = await modelTrainer.generateTrainingReport();
      console.log("Report:", report);
      toast({
        title: "Отчет сгенерирован",
        description: "Отчет об обучении модели сгенерирован"
      });
    } catch (error) {
      console.error("Ошибка при генерации отчета:", error);
      toast({
        title: "Ошибка генерации отчета",
        description: "Не удалось сгенерировать отчет",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Управление ML-моделями
          </h2>
          <p className="text-muted-foreground">
            Обучение и мониторинг моделей машинного обучения
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleSaveModel}>
            <Save className="h-4 w-4" />
            Сохранить модель
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleLoadModel}>
            <Upload className="h-4 w-4" />
            Загрузить модель
          </Button>
        </div>
      </div>

      <Tabs defaultValue="model" className="space-y-4">
        <TabsList>
          <TabsTrigger value="model">Модель</TabsTrigger>
          <TabsTrigger value="quality">Качество</TabsTrigger>
          <TabsTrigger value="interaction">Взаимодействие</TabsTrigger>
          <TabsTrigger value="business">Бизнес</TabsTrigger>
        </TabsList>

        <TabsContent value="model">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Статус модели
                </CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {modelStatus && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Версия:
                      </span>
                      <Badge>{modelStatus.modelVersion}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Последнее обучение:
                      </span>
                      <span className="text-sm">
                        {modelStatus.lastTrainingDate
                          ? new Date(
                              modelStatus.lastTrainingDate
                            ).toLocaleDateString()
                          : "Нет данных"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Статус:
                      </span>
                      <Badge
                        variant={
                          modelStatus.isTraining ? "secondary" : "default"
                        }
                      >
                        {modelStatus.isTraining ? "Обучается" : "Готова"}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Метрики модели
                </CardTitle>
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {trainingMetrics ? (
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Точность:</span>
                        <span>
                          {(trainingMetrics.accuracy * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={trainingMetrics.accuracy * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Precision:</span>
                        <span>
                          {(trainingMetrics.precision * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={trainingMetrics.precision * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Recall:</span>
                        <span>
                          {(trainingMetrics.recall * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={trainingMetrics.recall * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>F1 Score:</span>
                        <span>
                          {(trainingMetrics.f1Score * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={trainingMetrics.f1Score * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    Нет данных о метриках
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Действия</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    className="w-full gap-2"
                    onClick={handleStartTraining}
                    disabled={isTraining}
                  >
                    <Brain className="h-4 w-4" />
                    {isTraining ? "Обучение..." : "Начать обучение"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={generateReport}
                  >
                    <Download className="h-4 w-4" />
                    Сгенерировать отчет
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Метрики ранжирования
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metricsData?.quality && (
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>nDCG:</span>
                        <span>
                          {(metricsData.quality.nDCG * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={metricsData.quality.nDCG * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>MAP:</span>
                        <span>
                          {(metricsData.quality.MAP * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={metricsData.quality.MAP * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>MRR:</span>
                        <span>
                          {(metricsData.quality.MRR * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={metricsData.quality.MRR * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Разнообразие и новизна
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {metricsData?.quality && (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={[
                          {
                            metric: "Разнообразие",
                            value: metricsData.quality.diversity * 100
                          },
                          {
                            metric: "Покрытие",
                            value: metricsData.quality.coverage * 100
                          },
                          {
                            metric: "Неожиданность",
                            value: metricsData.quality.serendipity * 100
                          },
                          {
                            metric: "Новизна",
                            value: metricsData.quality.novelty * 100
                          }
                        ]}
                      >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar
                          name="Значение"
                          dataKey="value"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interaction">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Метрики взаимодействия
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metricsData?.interaction && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Просмотры</p>
                        <div className="text-2xl font-bold">
                          {metricsData.interaction.viewCount}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Клики</p>
                        <div className="text-2xl font-bold">
                          {metricsData.interaction.clickCount}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Отклики</p>
                        <div className="text-2xl font-bold">
                          {metricsData.interaction.applyCount}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          В избранном
                        </p>
                        <div className="text-2xl font-bold">
                          {metricsData.interaction.bookmarkCount}
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="text-sm text-muted-foreground">
                        Среднее время взаимодействия
                      </div>
                      <div className="text-2xl font-bold">
                        {Math.round(metricsData.interaction.timeSpent / 60)} мин
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Удовлетворенность пользователей
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metricsData?.satisfaction && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Релевантность:</span>
                        <span>
                          {(metricsData.satisfaction.relevance * 100).toFixed(
                            1
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={metricsData.satisfaction.relevance * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Своевременность:</span>
                        <span>
                          {(
                            metricsData.satisfaction.timeliness * 100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={metricsData.satisfaction.timeliness * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Персонализация:</span>
                        <span>
                          {(
                            metricsData.satisfaction.personalizedScore * 100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={metricsData.satisfaction.personalizedScore * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Объяснимость:</span>
                        <span>
                          {(
                            metricsData.satisfaction.explainability * 100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={metricsData.satisfaction.explainability * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Бизнес-метрики
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metricsData?.business && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Конверсия
                        </p>
                        <div className="text-2xl font-bold">
                          {(
                            metricsData.business.conversionRate * 100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Удержание
                        </p>
                        <div className="text-2xl font-bold">
                          {(
                            metricsData.business.retentionRate * 100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Вовлеченность
                        </p>
                        <div className="text-2xl font-bold">
                          {(
                            metricsData.business.engagementRate * 100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Время до конверсии
                        </p>
                        <div className="text-2xl font-bold">
                          {metricsData.business.averageTimeToConversion}ч
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="text-sm text-muted-foreground">
                        Влияние на выручку
                      </div>
                      <div className="text-2xl font-bold">
                        {metricsData.business.revenueImpact.toLocaleString()} ₸
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Тренды метрик
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        {
                          date: "2024-01",
                          conversion: 12,
                          engagement: 60,
                          retention: 70
                        },
                        {
                          date: "2024-02",
                          conversion: 14,
                          engagement: 65,
                          retention: 72
                        },
                        {
                          date: "2024-03",
                          conversion: 15,
                          engagement: 65,
                          retention: 75
                        }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="conversion"
                        stroke="#8884d8"
                        name="Конверсия"
                      />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#82ca9d"
                        name="Вовлеченность"
                      />
                      <Line
                        type="monotone"
                        dataKey="retention"
                        stroke="#ffc658"
                        name="Удержание"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>История обучения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { epoch: 1, loss: 0.5, accuracy: 0.6 },
                  { epoch: 2, loss: 0.4, accuracy: 0.7 },
                  { epoch: 3, loss: 0.3, accuracy: 0.8 },
                  { epoch: 4, loss: 0.25, accuracy: 0.85 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="#8884d8"
                  name="Loss"
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#82ca9d"
                  name="Accuracy"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}