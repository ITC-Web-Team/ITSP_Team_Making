"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Callback() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sessionKey = params.get("accessid");

    console.log("SESSION:", sessionKey);

    if (!sessionKey) return;

    async function fetchUser() {
      const res = await fetch(
        "https://sso.tech-iitb.org/project/getuserdata",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionkey: sessionKey }), // ✅ FIXED
        }
      );

      const user = await res.json();

      console.log("USER:", user);

      localStorage.setItem("user", JSON.stringify(user));

      console.log("STORED:", localStorage.getItem("user"));

      setTimeout(() => {
        router.push("/add");
      }, 300);
    }

    fetchUser();
  }, [params, router]);

  return <div className="text-white p-6">Logging in...</div>;
}