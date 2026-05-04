"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full bg-[#011c41] text-white px-6 py-4 flex items-center justify-between shadow-md h-30">

            {/* Title */}
            <h1 className="text-4xl font-semibold tracking-wide poppins-black">
                ITSP Team Making
            </h1>

            {/* Navigation Links */}
            <div className="flex gap-6 text-xl justify-around items-center">
                <Link href="/" className="hover:text-blue-400 transition">
                    Home
                </Link>
                <Link href="/profile" className="hover:text-blue-400 transition">
                    Profile
                </Link>
                <div className="bg-[#000000] flex justify-center items-center h-15 text-white py-2 px-4 mx-[4px] rounded-xl transform transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer border border-transparent hover:border-white">

                    Add Your Own Idea
                </div>
            </div>

        </nav>
    );
}