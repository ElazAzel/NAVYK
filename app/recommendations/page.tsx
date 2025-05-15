"use client";

import React, { useState } from "react";
import PageLayout from "@/app/components/PageLayout";
import EnhancedRecommendationEngine from "@/app/components/recommendations/EnhancedRecommendationEngine";
import MarketInsights from "@/app/components/recommendations/MarketInsights";
import RecommendationFilters from "@/app/components/recommendations/RecommendationFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const defaultFilters = {
  skills: [],
  employmentType: [],
  experienceLevel: [],
  salary: {},
  difficulty: [],
  matchScore: 50
};

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState(defaultFilters);
  const { toast } = useToast();

  const handleFilterChange = (newFilters: typeof defaultFilters) => {
    setFilters(newFilters);
    toast({
      title: "Фильтры обновлены",
      description: "Результаты были обновлены согласно выбранным фильтрам"
    });
  };

  const handleFilterReset = () => {
    setFilters(defaultFilters);
    toast({
      title: "Фильтры сброшены",
      description: "Все фильтры были сброшены к значениям по умолчанию"
    });
  };

  return (
    <PageLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Персональные рекомендации
          </h1>
          <p className="text-muted-foreground">
            Подобранные специально для вас предложения на основе вашего профиля и целей
          </p>
        </div>

        <MarketInsights />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <RecommendationFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleFilterReset}
            />
          </div>

          <div className="lg:col-span-3">
            <Card className="p-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="jobs">Вакансии</TabsTrigger>
                  <TabsTrigger value="courses">Курсы</TabsTrigger>
                  <TabsTrigger value="events">Мероприятия</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="m-0">
                  <EnhancedRecommendationEngine filters={filters} />
                </TabsContent>

                <TabsContent value="jobs" className="m-0">
                  <EnhancedRecommendationEngine type="job" filters={filters} />
                </TabsContent>

                <TabsContent value="courses" className="m-0">
                  <EnhancedRecommendationEngine type="course" filters={filters} />
                </TabsContent>

                <TabsContent value="events" className="m-0">
                  <EnhancedRecommendationEngine type="event" filters={filters} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </PageLayout>
  );
}