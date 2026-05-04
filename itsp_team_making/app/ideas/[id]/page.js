import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";

export default async function IdeaPage({ params }) {
  const id = Number(params.id);

  if (isNaN(id)) return notFound();

  const idea = await prisma.idea.findUnique({
    where: { id },
  });

  if (!idea) return notFound();

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#020617] to-[#0f172a] text-white flex justify-center px-4 py-10">
        
        <div className="w-full max-w-2xl bg-[#111827]/80 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-6 space-y-5">

          {/* Header */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {idea.flair}
            </span>

            <span className="text-sm text-gray-400">
              {idea.Private ? "Private" : "Public"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight">
            {idea.title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base leading-relaxed">
            {idea.text}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-800"></div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-400">
            <span>Posted by: {idea.user_LDAP}</span>
            <span>Contact: {idea.Contact}</span>
          </div>

        </div>
      </div>
    </>
  );
}