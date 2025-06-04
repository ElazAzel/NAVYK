"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

interface DemographicsChartProps {
  genderData: {
    male: number;
    female: number;
    other: number;
  };
  ageData: {
    "17-20": number;
    "21-25": number;
    "26-30": number;
    "31+": number;
  };
}

const DemographicsChart: React.FC<DemographicsChartProps> = ({ genderData, ageData }) => {
  // Рассчитаем проценты для гендерного распределения
  const totalGender = genderData.male + genderData.female + genderData.other;
  const malePercent = Math.round((genderData.male / totalGender) * 100);
  const femalePercent = Math.round((genderData.female / totalGender) * 100);
  const otherPercent = Math.round((genderData.other / totalGender) * 100);

  // Рассчитаем проценты для возрастных групп
  const totalAge = ageData["17-20"] + ageData["21-25"] + ageData["26-30"] + ageData["31+"];
  const age17to20Percent = Math.round((ageData["17-20"] / totalAge) * 100);
  const age21to25Percent = Math.round((ageData["21-25"] / totalAge) * 100);
  const age26to30Percent = Math.round((ageData["26-30"] / totalAge) * 100);
  const age31PlusPercent = Math.round((ageData["31+"] / totalAge) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Демографические данные</CardTitle>
        <CardDescription>Распределение студентов по полу и возрасту</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gender">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="gender">Пол</TabsTrigger>
            <TabsTrigger value="age">Возраст</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gender">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Мужской</span>
                <span className="text-sm text-muted-foreground">{malePercent}% ({genderData.male})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${malePercent}%` }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Женский</span>
                <span className="text-sm text-muted-foreground">{femalePercent}% ({genderData.female})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${femalePercent}%` }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Другой</span>
                <span className="text-sm text-muted-foreground">{otherPercent}% ({genderData.other})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${otherPercent}%` }}></div>
              </div>
              
              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Мужской</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                    <span className="text-sm">Женский</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm">Другой</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="age">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">17-20 лет</span>
                <span className="text-sm text-muted-foreground">{age17to20Percent}% ({ageData["17-20"]})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${age17to20Percent}%` }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">21-25 лет</span>
                <span className="text-sm text-muted-foreground">{age21to25Percent}% ({ageData["21-25"]})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${age21to25Percent}%` }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">26-30 лет</span>
                <span className="text-sm text-muted-foreground">{age26to30Percent}% ({ageData["26-30"]})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${age26to30Percent}%` }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">31+ лет</span>
                <span className="text-sm text-muted-foreground">{age31PlusPercent}% ({ageData["31+"]})</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${age31PlusPercent}%` }}></div>
              </div>
              
              <div className="flex justify-center mt-6">
                <div className="flex flex-wrap items-center gap-4 justify-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">17-20</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">21-25</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">26-30</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-sm">31+</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DemographicsChart; 