import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, BuildingOfficeIcon, CurrencyRupeeIcon, ClockIcon, MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  locationType: "remote" | "hybrid" | "office";
  salary: string;
  experience: string;
  employmentType: "full-time" | "part-time" | "internship" | "contract";
  description: string;
  skills: string[];
  postedDate: string;
  isBookmarked: boolean;
  isApplied: boolean;
  url: string;
}

interface JobListingsProps {
  title: string;
  subtitle: string;
  jobs: JobListing[];
}

const JobListings: React.FC<JobListingsProps> = ({
  title,
  subtitle,
  jobs: initialJobs,
}) => {
  const [jobs, setJobs] = useState<JobListing[]>(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocationType, setSelectedLocationType] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  // Получение всех уникальных навыков из вакансий
  const allSkills = Array.from(new Set(initialJobs.flatMap(job => job.skills))).sort();
  
  // Фильтрация вакансий на основе выбранных фильтров
  const filteredJobs = initialJobs.filter(job => {
    // Поиск по названию и описанию
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Фильтр по типу локации
    if (selectedLocationType.length > 0 && !selectedLocationType.includes(job.locationType)) {
      return false;
    }
    
    // Фильтр по типу занятости
    if (selectedEmploymentType.length > 0 && !selectedEmploymentType.includes(job.employmentType)) {
      return false;
    }
    
    // Фильтр по опыту
    if (selectedExperience && job.experience !== selectedExperience) {
      return false;
    }
    
    // Фильтр по навыкам
    if (selectedSkills.length > 0 && !selectedSkills.some(skill => job.skills.includes(skill))) {
      return false;
    }
    
    return true;
  });
  
  // Обработчик для добавления/удаления типа локации из фильтра
  const handleLocationTypeChange = (locationType: string) => {
    setSelectedLocationType(prev => 
      prev.includes(locationType) 
        ? prev.filter(type => type !== locationType)
        : [...prev, locationType]
    );
  };
  
  // Обработчик для добавления/удаления типа занятости из фильтра
  const handleEmploymentTypeChange = (employmentType: string) => {
    setSelectedEmploymentType(prev => 
      prev.includes(employmentType)
        ? prev.filter(type => type !== employmentType)
        : [...prev, employmentType]
    );
  };
  
  // Обработчик для добавления/удаления навыка из фильтра
  const handleSkillChange = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };
  
  // Обработчик для переключения закладки вакансии
  const toggleBookmark = (jobId: string) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
  };
  
  // Обработчик для подачи заявки на вакансию
  const applyForJob = (jobId: string) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, isApplied: true } : job
      )
    );
  };
  
  // Очистить все фильтры
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedLocationType([]);
    setSelectedEmploymentType([]);
    setSelectedExperience("");
    setSelectedSkills([]);
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Фильтры</CardTitle>
              <CardDescription>Настройте параметры поиска</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search">Поиск</Label>
                <Input 
                  id="search" 
                  placeholder="Название, компания, ключевые слова..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Тип работы</Label>
                <div className="space-y-2">
                  {["remote", "hybrid", "office"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`location-${type}`} 
                        checked={selectedLocationType.includes(type)}
                        onCheckedChange={() => handleLocationTypeChange(type)}
                      />
                      <label htmlFor={`location-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {type === "remote" ? "Удаленно" : 
                         type === "hybrid" ? "Гибридный" : 
                         "Офис"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Тип занятости</Label>
                <div className="space-y-2">
                  {["full-time", "part-time", "internship", "contract"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`employment-${type}`} 
                        checked={selectedEmploymentType.includes(type)}
                        onCheckedChange={() => handleEmploymentTypeChange(type)}
                      />
                      <label htmlFor={`employment-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {type === "full-time" ? "Полная занятость" : 
                         type === "part-time" ? "Частичная занятость" : 
                         type === "internship" ? "Стажировка" : 
                         "Контракт"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Опыт работы</Label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите опыт" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любой опыт</SelectItem>
                    <SelectItem value="No experience">Без опыта</SelectItem>
                    <SelectItem value="1-3 years">1-3 года</SelectItem>
                    <SelectItem value="3-5 years">3-5 лет</SelectItem>
                    <SelectItem value="5+ years">5+ лет</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Навыки</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {allSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`skill-${skill}`} 
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => handleSkillChange(skill)}
                      />
                      <label htmlFor={`skill-${skill}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={clearAllFilters}
              >
                Очистить фильтры
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Найдено вакансий: {filteredJobs.length}
            </div>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">По релевантности</SelectItem>
                <SelectItem value="date">По дате публикации</SelectItem>
                <SelectItem value="salary-high">По зарплате (выс-низ)</SelectItem>
                <SelectItem value="salary-low">По зарплате (низ-выс)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Вакансии не найдены</h3>
              <p className="mt-2 text-muted-foreground">
                Попробуйте изменить параметры поиска или очистить фильтры.
              </p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={clearAllFilters}
              >
                Очистить фильтры
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                          {job.companyLogo ? (
                            <Image 
                              src={job.companyLogo} 
                              alt={job.company} 
                              width={48} 
                              height={48} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <BuildingOfficeIcon className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <div className="flex items-center mt-1 text-muted-foreground">
                            <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">{job.company}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={job.isBookmarked ? "text-primary" : ""}
                        onClick={() => toggleBookmark(job.id)}
                      >
                        <StarIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPinIcon className="h-3 w-3" />
                        {job.location}
                        {job.locationType === "remote" && " (Удаленно)"}
                        {job.locationType === "hybrid" && " (Гибрид)"}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <CurrencyRupeeIcon className="h-3 w-3" />
                        {job.salary}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <BriefcaseIcon className="h-3 w-3" />
                        {job.employmentType === "full-time" ? "Полная занятость" : 
                         job.employmentType === "part-time" ? "Частичная занятость" : 
                         job.employmentType === "internship" ? "Стажировка" : 
                         "Контракт"}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        Опыт: {job.experience}
                      </Badge>
                    </div>
                    
                    <CardDescription className="line-clamp-3 mb-3">
                      {job.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex items-center justify-between pt-0">
                    <div className="text-xs text-muted-foreground">
                      Опубликовано: {job.postedDate}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => window.location.href = job.url}>
                        Подробнее
                      </Button>
                      <Button 
                        size="sm" 
                        disabled={job.isApplied}
                        onClick={() => applyForJob(job.id)}
                      >
                        {job.isApplied ? "Заявка отправлена" : "Откликнуться"}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings; 