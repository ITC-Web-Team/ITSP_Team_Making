import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";

function renderMessage(title, message) {
	return (
		<div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#020617] to-[#0f172a] text-white flex justify-center px-4 py-10">
			<div className="w-full max-w-2xl bg-[#111827]/80 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
				<h1 className="text-2xl font-bold">{title}</h1>
				<p className="text-gray-300">{message}</p>
			</div>
		</div>
	);
}

export default async function IdeaPage({ params }) {
	const rawId = params?.id ? String(params.id) : "";
	const id = Number.parseInt(rawId, 10);

	let idea = null;

	if (!rawId || Number.isNaN(id)) {
		return (
			<>
				<Navbar />
				{renderMessage("Invalid idea", "This idea link is not valid.")}
			</>
		);
	}

	try {
		idea = await prisma.idea.findUnique({
			where: { id },
		});
	} catch (error) {
		return (
			<>
				<Navbar />
				{renderMessage(
					"Something went wrong",
					"We could not load this idea right now. Please try again later."
				)}
			</>
		);
	}

	if (!idea) {
		return (
			<>
				<Navbar />
				{renderMessage("Idea not found", "This idea does not exist.")}
			</>
		);
	}

	return (
		<>
			<Navbar />

			<div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#020617] to-[#0f172a] text-white flex justify-center px-4 py-10">
				<div className="w-full max-w-2xl bg-[#111827]/80 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-6 space-y-5">
					<div className="flex justify-between items-start">
						<span className="px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
							{idea.flair}
						</span>

						<span className="text-sm text-gray-400">
							{idea.isPrivate ? "Private" : "Public"}
						</span>
					</div>

					<h1 className="text-3xl font-bold leading-tight">{idea.title}</h1>

					<p className="text-gray-300 text-base leading-relaxed">
						{idea.text}
					</p>

					<div className="border-t border-gray-800"></div>

					<div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-400">
						<span>Posted by: {idea.userLdap}</span>
						<span>Contact: {idea.contact}</span>
					</div>
				</div>
			</div>
		</>
	);
}
