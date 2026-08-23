import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase is not configured" }, { status: 503 });
  }

  try {
    const supa = await getSupabaseServerClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "upcoming";
    const universityId = searchParams.get("universityId");

    let query = supa.from("events").select(`
      *,
      universities (
        name,
        location
      )
    `);

    if (status) {
      query = query.eq("status", status);
    }
    if (universityId) {
      query = query.eq("university_id", universityId);
    }

    const { data, error } = await query.order("start_time", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, events: data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
