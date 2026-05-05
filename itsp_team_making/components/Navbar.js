"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <nav className="w-full bg-[#011c41] text-white px-4 sm:px-6 py-4 shadow-md">

      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-wide poppins-black">
          ITSP Team Making
        </h1>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 text-xl items-center">

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

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden mt-4 flex flex-col gap-4 text-base rounded-xl bg-white/5 p-4"
        >
          <Link
            href="/"
            className="hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/profile"
            className="hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>

          <Link
            href={user ? "/add" : "/login"}
            onClick={() => setMenuOpen(false)}
          >
            <div className="bg-black flex items-center py-2 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer border border-transparent hover:border-white">
              Add Your Own Idea
            </div>
          </Link>

          {!user ? (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition">
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
      )}
    </nav>
  );
}