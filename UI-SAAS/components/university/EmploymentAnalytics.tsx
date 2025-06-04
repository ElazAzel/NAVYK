"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";

interface CompanyType {
  type: string;
  count: number;
  percentage: number;
}

interface CompanyInfo {
  name: string;
  count: number;
  logo?: string;
}

interface EmploymentStage {
  stage: string;
  count: number;
  percentage: number;
}

interface FieldOfEmployment {
  field: string;
  count: number;
  percentage: number;
}

interface EmploymentAnalyticsProps {
  companyTypes: CompanyType[];
  topCompanies: CompanyInfo[];
  employmentStages: EmploymentStage[];
  fieldsOfEmployment: FieldOfEmployment[];
  employmentRate: number;
  averageSalary: number;
  averageTimeToEmployment: number; // в месяцах
}

const EmploymentAnalytics: React.FC<EmploymentAnalyticsProps> = ({
  companyTypes,
  topCompanies,
  employmentStages,
  fieldsOfEmployment,
  employmentRate,
  averageSalary,
  averageTimeToEmployment,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Аналитика трудоустройства</CardTitle>
        <CardDescription>Данные о трудоустройстве студентов и выпускников</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-primary mb-1">{employmentRate}%</div>
            <div className="text-sm text-muted-foreground text-center">Трудоустроено выпускников</div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-primary mb-1">{averageSalary.toLocaleString()} ₸</div>
            <div className="text-sm text-muted-foreground text-center">Средняя зарплата</div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-primary mb-1">{averageTimeToEmployment}</div>
            <div className="text-sm text-muted-foreground text-center">
              {averageTimeToEmployment === 1 ? "Месяц" : 
               averageTimeToEmployment < 5 ? "Месяца" : "Месяцев"} до трудоустройства
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="stages">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="stages">Этапы</TabsTrigger>
            <TabsTrigger value="companies">Компании</TabsTrigger>
            <TabsTrigger value="fields">Направления</TabsTrigger>
            <TabsTrigger value="top">Топ компаний</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stages">
            <div className="space-y-4">
              {employmentStages.map((stage) => (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="text-sm text-muted-foreground">{stage.count} ({stage.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Распределение студентов по этапам трудоустройства</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="companies">
            <div className="space-y-4">
              {companyTypes.map((type) => (
                <div key={type.type} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{type.type}</span>
                    <span className="text-sm text-muted-foreground">{type.count} ({type.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className="bg-purple-500 h-2.5 rounded-full"
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Распределение по типам компаний</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    ИТ-компании
                  </Badge>
                  <Badge variant="outline">
                    {companyTypes.sort((a, b) => b.percentage - a.percentage)[0].type}
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fields">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                {fieldsOfEmployment.map((field) => (
                  <div key={field.field} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{field.field}</span>
                      <span className="text-sm text-muted-foreground">{field.count} ({field.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${Math.max(field.percentage, 3)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative h-full flex items-center justify-center">
                <div className="w-full max-w-[200px]">
                  <svg viewBox="0 0 100 100" className="w-full">
                    <circle cx="50" cy="50" r="45" className="fill-muted/20" />

                    {fieldsOfEmployment.map((field, index) => {
                      // Размер сегмента пропорционален проценту
                      const size = (field.percentage / 100) * 45;

                      return (
                        <circle
                          key={field.field}
                          cx="50"
                          cy="50"
                          r={size}
                          className={`fill-green-${300 + (index * 100)}`}
                          style={{ opacity: 0.8 }}
                        />
                      );
                    })}

                    <rect x="30" y="46" width="40" height="12" rx="2" className="fill-muted/80" />
                    <text x="50" y="53" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-xs font-medium">
                      Направления
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Распределение по направлениям трудоустройства</p>
            </div>
          </TabsContent>
          
          <TabsContent value="top">
            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={company.name} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-md">
                      {index + 1}
                    </div>
                    <span className="font-medium">{company.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {company.count} {company.count === 1 ? 'выпускник' : 
                     company.count < 5 ? 'выпускника' : 'выпускников'}
                  </div>
                </div>
              ))}
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Топ компаний по найму выпускников вуза</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Всего: {topCompanies.reduce((sum, company) => sum + company.count, 0)} трудоустроено
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmploymentAnalytics; 