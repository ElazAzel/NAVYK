"use client";

import React from "react";
import PageLayout from "@/app/components/PageLayout";
import RecommendationAnalytics from "@/app/components/employer/RecommendationAnalytics";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmployerAnalyticsPage() {
  return (
    <PageLayout>
      <div className="container py-6">
        <Tabs defaultValue="recommendations" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
              <TabsTrigger value="candidates">Кандидаты</TabsTrigger>
              <TabsTrigger value="engagement">Вовлеченность</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <RecommendationAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates">
            <Card>
              <CardContent className="p-6">
                {/* Здесь будет аналитика по кандидатам */}
                <div className="text-center text-muted-foreground">
                  Аналитика по кандидатам находится в разработке
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement">
            <Card>
              <CardContent className="p-6">
                {/* Здесь будет аналитика вовлеченности */}
                <div className="text-center text-muted-foreground">
                  Аналитика вовлеченности находится в разработке
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}