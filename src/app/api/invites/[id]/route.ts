import { NextResponse } from "next/server";

import { supabase } from "../../lib/supabase-client";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data, error } = await supabase
    .from("invites")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "Convite não encontrado ou expirado" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
