import Link from "next/link";
export default function IdeaCard({ idea }) {
  const ideaId = idea?.id ? String(idea.id) : "";

  if (!ideaId) {
    return null;
  }

  return (
  <Link href={`/ideas/${encodeURIComponent(ideaId)}`}>
    <div className="group relative  bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] rounded-2xl p-[1px] hover:scale-[1.02] transition-all duration-300">
      
      {/* gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100 blur-sm transition"></div>

      <div className="relative bg-[#111827] p-5 rounded-2xl border border-gray-800 shadow-md group-hover:shadow-xl transition">

        {/* Flair badge */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
            {idea.flair}
          </span>

          <span className="text-xs text-gray-500">
            {idea.userLdap}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition break-words">
          {idea.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 mt-2 text-sm leading-relaxed line-clamp-3 overflow-hidden">
          {idea.text}
        </p>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
          <span>Contact: {idea.contact}</span>
          <span>{idea.isPrivate ? "Private 🔒" : "Public 🌍"}</span>
        </div>

      </div>
    </div>
    </Link>
  );
}