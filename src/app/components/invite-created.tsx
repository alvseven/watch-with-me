"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Check, Copy } from "lucide-react";

type InviteCreatedProps = {
  inviteId: string;
};

export function InviteCreated({ inviteId }: InviteCreatedProps) {
  const [copied, setCopied] = useState(false);
  const inviteLink = `${window.location.origin}/invites/${inviteId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4 text-center">
            Convite Criado!
          </h2>
          <p className="text-zinc-300 mb-6 text-center">
            Seu convite foi criado com sucesso. Compartilhe o link abaixo com
            seu convidado.
          </p>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              readOnly
              value={inviteLink}
              className="bg-zinc-800 text-zinc-100 border-zinc-700"
            />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="icon"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-700"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-zinc-400 text-center">
            {copied ? "Link copiado!" : "Clique no botão para copiar o link"}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
