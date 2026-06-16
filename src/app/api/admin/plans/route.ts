import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data: plans, error } = await supabase
    .from("membership_plans")
    .select("*")
    .order("sort_order");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(plans);
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();

  const { data, error } = await supabase
    .from("membership_plans")
    .insert({
      name: body.name,
      price: body.price,
      period: body.period,
      description: body.description || null,
      features: body.features || [],
      admission_fee: body.admission_fee ?? 0,
      is_featured: body.is_featured ?? false,
      is_active: body.is_active ?? true,
      sort_order: body.sort_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
