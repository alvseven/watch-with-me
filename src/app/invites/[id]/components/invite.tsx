"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilmIcon, MessageCircleIcon, UserIcon, UsersIcon } from "lucide-react";
import Confetti from "react-confetti";

type Invite = {
  guest: string;
  host: string;
  movie: string;
  image: string;
  description: string;
};

export function Invite({ guest, host, movie, image, description }: Invite) {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
          <CardContent className="p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col lg:flex-row items-center gap-8"
            >
              {image && (
                <div className="relative w-full lg:w-1/3 aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={image}
                    alt={`Poster do filme ${movie}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-6">
                  Convite para Filme
                </h1>
                <div className="space-y-4">
                  <p className="text-xl text-zinc-300 flex items-center justify-center lg:justify-start">
                    <UserIcon className="mr-2" />
                    Olá, <span className="font-semibold ml-1">{guest}</span>
                  </p>
                  <p className="text-xl text-zinc-300 flex items-center justify-center lg:justify-start">
                    <UsersIcon className="mr-2" />
                    Você foi convidado(a) por{" "}
                    <span className="font-semibold ml-1">{host}</span>
                  </p>
                  <p className="text-xl text-zinc-300 flex items-center justify-center lg:justify-start">
                    <FilmIcon className="mr-2" />
                    Para assistir o filme:{" "}
                    <span className="font-semibold ml-1">{movie}</span>
                  </p>
                  {description && (
                    <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
                      <p className="text-lg text-zinc-300 flex items-start">
                        <MessageCircleIcon className="mr-2 mt-1 flex-shrink-0" />
                        <span className="italic">{`"${description}"`}</span>
                      </p>
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {!accepted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-8 flex justify-center"
                    >
                      <Button
                        onClick={handleAccept}
                        className="w-full lg:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        Aceitar Convite
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8 p-4 bg-green-800 rounded-lg"
                    >
                      <p className="text-lg text-green-100">
                        Que ótimo! Agora avise {host} que você aceitou o
                        convite, ainda não implementamos notificações 😁
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
