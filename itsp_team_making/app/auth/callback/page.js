"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Callback() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sessionKey = params.get("accessid");

    if (!sessionKey) return;

    async function fetchUser() {
      const res = await fetch(
        "https://sso.tech-iitb.org/project/getuserdata",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: sessionKey }),
        }
      );

      const user = await res.json();

      // store in browser
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/add");
    }

    fetchUser();
  }, [params, router]);

  return <div className="text-white p-6">Logging in...</div>;
}