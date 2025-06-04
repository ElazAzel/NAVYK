"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, XIcon } from "lucide-react";

interface FilterProps {
  filters: {
    skills: string[];
    location?: string;
    employmentType: string[];
    experienceLevel: string[];
    salary: {
      min?: number;
      max?: number;
    };
    rating?: number;
    difficulty: number[];
    matchScore: number;
  };
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const employmentTypes = [
  { label: "Полный день", value: "full-time" },
  { label: "Частичная занятость", value: "part-time" },
  { label: "Контракт", value: "contract" },
  { label: "Стажировка", value: "internship" }
];

const experienceLevels = [
  { label: "Стажер", value: "intern" },
  { label: "Junior", value: "junior" },
  { label: "Middle", value: "middle" },
  { label: "Senior", value: "senior" },
  { label: "Lead", value: "lead" }
];

export default function RecommendationFilters({
  filters,
  onFilterChange,
  onReset
}: FilterProps) {
  const handleSkillRemove = (skillToRemove: string) => {
    onFilterChange({
      ...filters,
      skills: filters.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleEmploymentTypeChange = (type: string) => {
    const updatedTypes = filters.employmentType.includes(type)
      ? filters.employmentType.filter(t => t !== type)
      : [...filters.employmentType, type];
    
    onFilterChange({
      ...filters,
      employmentType: updatedTypes
    });
  };

  const handleExperienceLevelChange = (level: string) => {
    const updatedLevels = filters.experienceLevel.includes(level)
      ? filters.experienceLevel.filter(l => l !== level)
      : [...filters.experienceLevel, level];
    
    onFilterChange({
      ...filters,
      experienceLevel: updatedLevels
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Фильтры</span>
          <Button variant="ghost" size="sm" onClick={onReset}>
            Сбросить
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Поиск по навыкам</Label>
            <div className="relative">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Введите навык..."
                className="pl-8"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    const input = e.currentTarget;
                    if (input.value && !filters.skills.includes(input.value)) {
                      onFilterChange({
                        ...filters,
                        skills: [...filters.skills, input.value]
                      });
                      input.value = "";
                    }
                  }
                }}
              />
            </div>
            {filters.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-2 py-1"
                  >
                    {skill}
                    <button
                      className="ml-2 hover:text-destructive"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Местоположение</Label>
            <Input
              placeholder="Город..."
              value={filters.location || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  location: e.target.value
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Минимальное совпадение</Label>
            <div className="pt-2">
              <Slider
                defaultValue={[filters.matchScore]}
                max={100}
                step={1}
                onValueChange={([value]) =>
                  onFilterChange({
                    ...filters,
                    matchScore: value
                  })
                }
              />
              <div className="flex justify-between mt-1">
                <span className="text-sm text-muted-foreground">{filters.matchScore}%</span>
                <span className="text-sm text-muted-foreground">100%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Тип занятости</Label>
            <div className="grid grid-cols-2 gap-2">
              {employmentTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`employment-${type.value}`}
                    checked={filters.employmentType.includes(type.value)}
                    onCheckedChange={() => handleEmploymentTypeChange(type.value)}
                  />
                  <label
                    htmlFor={`employment-${type.value}`}
                    className="text-sm"
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Уровень</Label>
            <div className="grid grid-cols-2 gap-2">
              {experienceLevels.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${level.value}`}
                    checked={filters.experienceLevel.includes(level.value)}
                    onCheckedChange={() => handleExperienceLevelChange(level.value)}
                  />
                  <label
                    htmlFor={`level-${level.value}`}
                    className="text-sm"
                  >
                    {level.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Зарплата (₸)</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="От"
                value={filters.salary.min || ""}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    salary: {
                      ...filters.salary,
                      min: parseInt(e.target.value) || undefined
                    }
                  })
                }
              />
              <Input
                type="number"
                placeholder="До"
                value={filters.salary.max || ""}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    salary: {
                      ...filters.salary,
                      max: parseInt(e.target.value) || undefined
                    }
                  })
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}