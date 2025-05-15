"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Building, Star } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  organizerType: string;
  organizerName: string;
  attendees: number;
  maxAttendees?: number;
  points: number;
  registered: boolean;
  skills: string[];
}

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
  onCancel?: (eventId: string) => void;
}

export default function EventCard({ event, onRegister, onCancel }: EventCardProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleRegister = () => {
    if (!onRegister) return;
    setIsRegistering(true);
    setTimeout(() => {
      onRegister(event.id);
      setIsRegistering(false);
    }, 600);
  };

  const handleCancel = () => {
    if (!onCancel) return;
    setIsCancelling(true);
    setTimeout(() => {
      onCancel(event.id);
      setIsCancelling(false);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className="mb-2">
                {event.category}
              </Badge>
              <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
              <CardDescription className="flex items-center">
                <Building className="h-4 w-4 mr-1" />
                {event.organizerName}
              </CardDescription>
            </div>
            {event.registered && (
              <Badge>Вы зарегистрированы</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{event.startTime} - {event.endTime}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {event.attendees}
                {event.maxAttendees && ` / ${event.maxAttendees}`}
                {event.maxAttendees 
                  ? ` ${event.maxAttendees <= 1 ? "место" : event.maxAttendees <= 4 ? "места" : "мест"}`
                  : ` ${event.attendees <= 1 ? "участник" : event.attendees <= 4 ? "участника" : "участников"}`
                }
              </span>
            </div>
          </div>

          {event.skills.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Навыки:</p>
              <div className="flex flex-wrap gap-1">
                {event.skills.map(skill => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t pt-4">
          <div className="w-full flex justify-between items-center">
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              +{event.points} баллов
            </Badge>

            {event.registered ? (
              <Button 
                variant="destructive"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Отмена регистрации...</span>
                  </div>
                ) : (
                  "Отменить регистрацию"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleRegister}
                disabled={isRegistering || (event.maxAttendees !== undefined && event.attendees >= event.maxAttendees)}
              >
                {isRegistering ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Регистрация...</span>
                  </div>
                ) : event.maxAttendees !== undefined && event.attendees >= event.maxAttendees ? (
                  "Мест нет"
                ) : (
                  "Зарегистрироваться"
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}