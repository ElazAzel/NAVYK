"use client";

import React from "react";
import MLModelManagement from "@/app/components/admin/MLModelManagement";
import PageLayout from "@/app/components/PageLayout";

export default function MLModelsPage() {
  return (
    <PageLayout>
      <div className="container py-6">
        <MLModelManagement />
      </div>
    </PageLayout>
  );
}