import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function IdeaPage({ params }) {
  const idea = await prisma.idea.findUnique({
    where: { id: Number(params.id) },
  });

  if (!idea) return notFound();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">{idea.title}</h1>

      <p className="text-gray-400 mb-4">{idea.text}</p>

      <div className="flex gap-4 text-sm text-gray-500">
        <span>{idea.flair}</span>
        <span>{idea.user_LDAP}</span>
        <span>Contact: {idea.Contact}</span>
      </div>

      <div className="mt-4">
        {idea.Private ? "Private 🔒" : "Public 🌍"}
      </div>
    </div>
  );
}