import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabase-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_request: NextRequest, context: any) {
  const id = context.params.id;

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
