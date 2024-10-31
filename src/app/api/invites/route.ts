import { NextResponse } from "next/server";

import { supabase } from "../lib/supabase-client";

type CreateInvite = {
  guest: string;
  host: string;
  description: string;
  movie: {
    title: string;
    poster: string;
  };
};

export async function POST(request: Request) {
  const { guest, host, description, movie } =
    (await request.json()) as CreateInvite;

  if (!movie || !guest || !host) {
    return NextResponse.json(
      { error: "Guest, host, and movie data are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("invites")
    .insert({
      guest,
      host,
      description,
      movie: movie.title,
      image: movie.poster,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to create invite" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, inviteId: data.id });
}
