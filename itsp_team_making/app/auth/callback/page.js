import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Callback({ searchParams }) {
  const sessionKey = searchParams?.accessid;

  if (!sessionKey) {
    return <div className="text-white p-6">Invalid login</div>;
  }

  try {
    // Fetch user data from SSO
    const res = await fetch(
      "https://sso.tech-iitb.org/project/getuserdata",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sessionKey }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await res.json();

    // Store user in cookie
    cookies().set("user", JSON.stringify(user), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: true, // IMPORTANT for production (HTTPS)
    });

    // redirect to add idea page (better UX)
    redirect("/add");

  } catch (err) {
    console.error(err);
    return <div className="text-white p-6">Login failed</div>;
  }
}