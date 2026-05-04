"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddIdeaPage() {
  const [form, setForm] = useState({
    title: "",
    text: "",
    flair: "",
    contact: "",
    private: false,
  });

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
      return;
    }

    // prefill contact
    setForm((prev) => ({
      ...prev,
      contact: user.contact || "",
    }));
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    const res = await fetch("/api/ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        user,
      }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to add idea");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] p-6 rounded-2xl w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl font-bold">Add Idea</h1>

        <input
          placeholder="Title"
          className="w-full p-2 rounded bg-black border border-gray-700"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 rounded bg-black border border-gray-700"
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />

        <input
          placeholder="Flair"
          className="w-full p-2 rounded bg-black border border-gray-700"
          onChange={(e) => setForm({ ...form, flair: e.target.value })}
        />

        <input
          placeholder="Contact"
          value={form.contact}
          className="w-full p-2 rounded bg-black border border-gray-700"
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) =>
              setForm({ ...form, private: e.target.checked })
            }
          />
          Private Idea
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded-xl hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}