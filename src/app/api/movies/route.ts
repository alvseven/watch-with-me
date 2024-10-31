import { NextResponse } from "next/server";

export type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
};

type GetMovieResponse = {
  Response: "True" | "False";
  Search: Movie[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json(
      { error: "Title parameter is required" },
      { status: 400 }
    );
  }

  const omdbApiKey = process.env.OMDB_API_KEY;

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${title}&type=movie`
  );

  const data = (await response.json()) as GetMovieResponse;

  if (data.Response === "False") {
    return NextResponse.json([]);
  }

  const suggestions = data.Search.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    poster: movie.Poster,
  }));

  return NextResponse.json(suggestions);
}
