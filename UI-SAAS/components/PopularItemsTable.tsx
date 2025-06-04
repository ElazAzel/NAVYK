"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PopularItemsTableProps {
  title: string;
  items: Array<{
    id: string;
    title: string;
    category: string;
    participants: number;
  }>;
}

const PopularItemsTable: React.FC<PopularItemsTableProps> = ({ title, items }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="font-medium">{item.title}</div>
                <Badge variant="outline" className="mt-1 text-xs">{item.category}</Badge>
              </div>
              <div className="text-muted-foreground text-sm">{item.participants} участников</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularItemsTable; 