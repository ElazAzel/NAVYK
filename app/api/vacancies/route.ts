import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase is not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "open";
  const employerId = searchParams.get("employerId");

  try {
    const supa = await getSupabaseServerClient();
    let query = supa.from("jobs").select(`
      *,
      employers (
        company_name,
        industry
      )
    `);

    if (status) {
      query = query.eq("status", status);
    }
    if (employerId) {
      query = query.eq("employer_id", employerId);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, vacancies: data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase is not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const {
      title,
      description,
      requirements,
      location,
      salaryMin,
      salaryMax,
      employmentType,
    } = body;

    // Проверка аутентификации
    const supa = await getSupabaseServerClient();
    const { data: { user } } = await supa.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Получаем employer_id из профиля
    const { data: profile } = await supa
      .from("employers")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Employer profile not found" },
        { status: 403 }
      );
    }

    const { data, error } = await supa.from("jobs").insert({
      title,
      description,
      requirements,
      location,
      salary_min: salaryMin,
      salary_max: salaryMax,
      employment_type: employmentType,
      employer_id: profile.id,
      status: "open",
    }).select().single();

    if (error) throw error;

    return NextResponse.json({ success: true, vacancy: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
