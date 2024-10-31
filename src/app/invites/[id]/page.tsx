import { notFound } from "next/navigation";
import { Invite } from "./components/invite";

type InviteData = {
  guest: string;
  host: string;
  movie: string;
  image: string;
  description: string;
};

async function getInvite(id: string): Promise<InviteData | null> {
  "use server";

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/invites/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function InvitePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const invite = await getInvite(id);

  if (!invite) {
    notFound();
  }

  return (
    <Invite
      guest={invite.guest}
      host={invite.host}
      description={invite.description}
      image={invite.image}
      movie={invite.movie}
    />
  );
}
