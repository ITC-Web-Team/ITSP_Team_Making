"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

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

export default function IdeaPage() {
	const params = useParams();
	const rawId = useMemo(() => {
		if (!params?.id) return "";
		if (Array.isArray(params.id)) return params.id[0] || "";
		return String(params.id);
	}, [params]);

	const [idea, setIdea] = useState(null);
	const [status, setStatus] = useState("idle");

	useEffect(() => {
		if (!rawId) return;

		let active = true;

		async function loadIdea() {
			setStatus("loading");
			try {
				const res = await fetch(`/api/ideas?id=${encodeURIComponent(rawId)}`);
				const data = await res.json();

				if (!active) return;

				if (!res.ok) {
					setStatus(res.status === 404 ? "not-found" : "error");
					return;
				}

				setIdea(data);
				setStatus("ready");
			} catch (error) {
				if (!active) return;
				setStatus("error");
			}
		}

		loadIdea();

		return () => {
			active = false;
		};
	}, [rawId]);

	if (!rawId) {
		return (
			<>
				<Navbar />
				{renderMessage("Invalid idea", "This idea link is not valid.")}
			</>
		);
	}

	if (status === "loading" || status === "idle") {
		return (
			<>
				<Navbar />
				{renderMessage("Loading", "Fetching idea details...")}
			</>
		);
	}

	if (status === "not-found") {
		return (
			<>
				<Navbar />
				{renderMessage("Idea not found", "This idea does not exist.")}
			</>
		);
	}

	if (status === "error") {
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
				{renderMessage(
					"Something went wrong",
					"We could not load this idea right now. Please try again later."
				)}
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
