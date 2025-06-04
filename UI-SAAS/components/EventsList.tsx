import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, UserGroupIcon, ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface EventOrCourse {
  id: string;
  title: string;
  description: string;
  type: "event" | "course" | "job";
  imageUrl: string;
  date: string;
  location: string;
  organizer: string;
  participantsCount: number;
  duration?: string;
  tags: string[];
  url: string;
}

interface FilterProps {
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  tags: string[];
}

const Filter: React.FC<FilterProps> = ({ selectedTags, onTagClick, tags }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Фильтр по тегам:</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

interface EventsListProps {
  title: string;
  subtitle: string;
  items: EventOrCourse[];
  selectedTags?: string[];
  onFilterChange?: (tags: string[]) => void;
}

const EventsList: React.FC<EventsListProps> = ({
  title,
  subtitle,
  items,
  selectedTags = [],
  onFilterChange,
}) => {
  const allTags = Array.from(new Set(items.flatMap(item => item.tags)));
  
  const handleTagClick = (tag: string) => {
    if (!onFilterChange) return;
    
    if (selectedTags.includes(tag)) {
      onFilterChange(selectedTags.filter(t => t !== tag));
    } else {
      onFilterChange([...selectedTags, tag]);
    }
  };

  const filteredItems = selectedTags.length > 0
    ? items.filter(item => selectedTags.some(tag => item.tags.includes(tag)))
    : items;

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
      </div>

      <Filter
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
        tags={allTags}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48 w-full">
              <Image 
                src={item.imageUrl} 
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={
                  item.type === "event" ? "secondary" : 
                  item.type === "course" ? "default" : 
                  "destructive"
                }>
                  {item.type === "event" ? "Мероприятие" : 
                   item.type === "course" ? "Курс" : 
                   "Вакансия"}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3 mb-4">
                {item.description}
              </CardDescription>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{item.date}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span>{item.location}</span>
                </div>
                
                {item.duration && (
                  <div className="flex items-center text-muted-foreground">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    <span>{item.duration}</span>
                  </div>
                )}
                
                <div className="flex items-center text-muted-foreground">
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  <span>{item.participantsCount} участников</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-2">
              <div className="text-sm text-muted-foreground">
                Организатор: {item.organizer}
              </div>
              <Button 
                size="sm" 
                className="ml-auto"
                onClick={() => window.location.href = item.url}
              >
                Подробнее
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Нет доступных мероприятий или курсов с выбранными фильтрами</p>
          {selectedTags.length > 0 && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => onFilterChange && onFilterChange([])}
            >
              Сбросить фильтры
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsList; 