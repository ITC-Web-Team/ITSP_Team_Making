import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.json();
    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = JSON.parse(userCookie.value);

    const idea = await prisma.idea.create({
      data: {
        title: body.title,
        text: body.text,
        flair: body.flair,
        Contact: Number(body.contact),
        Private: body.private,

        // from SSO
        user_LDAP: user.ldap || user.rollno || "unknown",
      },
    });

    return Response.json(idea);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}