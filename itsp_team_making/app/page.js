import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import IdeaCard from "@/components/IdeaCard";
export const dynamic = "force-dynamic";
export default async function Home() {
  const ideas = await prisma.idea.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </>
  );
}