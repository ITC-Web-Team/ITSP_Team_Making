"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <nav className="w-full bg-[#011c41] text-white px-6 py-4 flex items-center justify-between shadow-md h-30">

      {/* Title */}
      <h1 className="text-4xl font-semibold tracking-wide poppins-black">
        ITSP Team Making
      </h1>

      {/* Navigation */}
      <div className="flex gap-6 text-xl items-center">

        <Link href="/" className="hover:text-blue-400 transition">
          Home
        </Link>

        <Link href="/profile" className="hover:text-blue-400 transition">
          Profile
        </Link>

        {/* Add Idea */}
        <Link href={user ? "/add" : "/login"}>
          <div className="bg-black flex items-center py-2 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer border border-transparent hover:border-white">
            Add Your Own Idea
          </div>
        </Link>

        {/* Login / Logout */}
        {!user ? (
          <Link href="/login">
            <button className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
            className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}