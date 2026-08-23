import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase is not configured" }, { status: 503 });
  }

  try {
    const supa = await getSupabaseServerClient();
    const { data: { user } } = await supa.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Получаем статистику только текущего пользователя.
    const { data, error } = await supa
      .from("students")
      .select("id, current_course, skills, achievements")
      .eq("id", user.id)
      .maybeSingle();

    if (error) throw error;

    // Подсчитываем KPI метрики
    const stats = {
      activeCourses: data?.current_course || 0,
      achievements: Array.isArray(data?.achievements) ? data.achievements.length : 0,
      skills: data?.skills?.length || 0,
      progress: Math.round(((data?.current_course || 0) / 6) * 100),
    };

    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
