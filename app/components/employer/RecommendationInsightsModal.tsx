"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";
import RecommendationInsights from "./RecommendationInsights";

interface RecommendationInsightsModalProps {
  recommendationId: string;
  recommendationTitle: string;
}

export default function RecommendationInsightsModal({
  recommendationId,
  recommendationTitle
}: RecommendationInsightsModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <LineChart className="h-4 w-4" />
          Инсайты
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Инсайты: {recommendationTitle}
          </DialogTitle>
        </DialogHeader>
        <RecommendationInsights recommendationId={recommendationId} />
      </DialogContent>
    </Dialog>
  );
}