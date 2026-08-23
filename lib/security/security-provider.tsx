"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

// Backwards-compatible helper for components that still import `supa`.
export const supa = {
  get auth() {
    return getSupabaseBrowserClient().auth;
  },
  from(table: string) {
    return getSupabaseBrowserClient().from(table);
  },
};
