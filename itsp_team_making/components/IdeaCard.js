export default function IdeaCard({ idea }) {
  return (
    <div className="group relative bg-[#0b0f1a] rounded-2xl p-[1px] hover:scale-[1.02] transition-all duration-300">
      
      {/* gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100 blur-sm transition"></div>

      <div className="relative bg-[#111827] p-5 rounded-2xl border border-gray-800 shadow-md group-hover:shadow-xl transition">

        {/* Flair badge */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
            {idea.flair}
          </span>

          <span className="text-xs text-gray-500">
            {idea.user_LDAP}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
          {idea.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 mt-2 text-sm leading-relaxed line-clamp-3">
          {idea.text}
        </p>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
          <span>Contact: {idea.Contact}</span>
          <span>{idea.Private ? "Private 🔒" : "Public 🌍"}</span>
        </div>

      </div>
    </div>
  );
}