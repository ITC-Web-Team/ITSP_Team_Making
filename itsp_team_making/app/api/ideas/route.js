import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.user || !body.user.ldap) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idea = await prisma.idea.create({
      data: {
        title: body.title,
        text: body.text,
        flair: body.flair,
        Contact: Number(body.contact),
        Private: body.private,
        user_LDAP: body.user.roll,
      },
    });

    return Response.json(idea);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}