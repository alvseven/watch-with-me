"use client";

import { useState, useDeferredValue, useEffect } from "react";
import Image from "next/image";

import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Input } from "@/app/components/ui/input";

import { InviteCreated } from "./components/invite-created";

type Movie = { id: string; title: string; poster: string };

export default function Home() {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [movieSearch, setMovieSearch] = useState("");
  const [moviePopoverIsOpen, setMoviePopoverIsOpen] = useState(false);
  const [createdInviteId, setCreatedInviteId] = useState<string | null>(null);

  const deferredMovieSearch = useDeferredValue(movieSearch);

  const createInviteSchema = z.object({
    host: z.string().min(1, "Preencha o seu nome"),
    guest: z.string().min(1, "Preencha o nome do convidado"),
    description: z.string().min(1, "Preencha o campo descrição"),
    movie: z.object({
      id: z.string().min(1, "Selecione um filme"),
      title: z.string().min(1, "Selecione um filme"),
      poster: z.string().min(1, "Selecione um filme"),
    }),
  });

  type CreateInvite = z.infer<typeof createInviteSchema>;

  const form = useForm<CreateInvite>({
    resolver: zodResolver(createInviteSchema),
    defaultValues: {
      host: "",
      guest: "",
      description: "",
      movie: {
        id: "",
        title: "",
        poster: "",
      },
    },
  });

  useEffect(() => {
    async function searchMovies() {
      if (deferredMovieSearch) {
        const response = await fetch(
          `/api/movies?title=${deferredMovieSearch}`
        );

        const movies = await response.json();

        setMovies(movies);
      }
    }
    searchMovies();
  }, [deferredMovieSearch]);

  const createInvite = async (data: CreateInvite) => {
    const response = await fetch(`/api/invites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      setCreatedInviteId(result.inviteId);
    }
  };
  return (
    <div className="flex h-full justify-center items-center w-full max-w-md m-auto p-6">
      {createdInviteId ? (
        <InviteCreated inviteId={createdInviteId} />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createInvite)}
            className="space-y-6"
          >
            <h1 className="text-2xl font-bold text-slate-100 text-center">
              Seja bem vindo!
            </h1>
            <h4 className="text-lg font-semibold text-slate-100 text-center">
              Preencha os campos abaixo para criar seu convite
            </h4>
            <FormField
              control={form.control}
              name="host"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className="text-slate-300"
                      placeholder="Seu nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quem você quer convidar pra assistir com você?
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-slate-300"
                      placeholder="Nome do convidado"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Input
                      className="text-slate-300"
                      placeholder="Olá, gostaria de lhe convidar..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Mensagem a ser exibida no convite.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="movie"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Qual o nome do filme?</FormLabel>
                  <Popover
                    open={moviePopoverIsOpen}
                    onOpenChange={setMoviePopoverIsOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between bg-transparent hover:bg-zinc-900 text-slate-100 hover:text-slate-100",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value.title || "Selecione um filme"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Procure um filme..."
                          onValueChange={(value) => setMovieSearch(value)}
                        />
                        <CommandEmpty>Nenhum filme encontrado.</CommandEmpty>
                        <CommandGroup>
                          <CommandList className="scrollbar">
                            {movies.map((movie) => (
                              <CommandItem
                                value={movie.title}
                                key={movie.id}
                                onSelect={() => {
                                  form.setValue("movie", movie);
                                  setMoviePopoverIsOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    movie.title === field.value.title
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex items-center">
                                  {movie.poster !== "N/A" && (
                                    <Image
                                      src={movie.poster}
                                      alt={movie.title}
                                      width={200}
                                      height={200}
                                      className="mr-2 size-24 rounded"
                                    />
                                  )}
                                  {movie.title}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Selecione um filme para o seu convite, pesquise em inglês.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-6">
              Criar convite
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
