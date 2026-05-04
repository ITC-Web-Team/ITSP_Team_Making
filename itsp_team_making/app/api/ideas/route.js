import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    console.log("API HIT"); // debug

    const body = await req.json();
    console.log("BODY:", body);

    if (!body || !body.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idea = await prisma.idea.create({
      data: {
        title: body.title,
        text: body.text,
        flair: body.flair || "",

        // FIXED names (match schema exactly)
        contact: body.contact ? Number(body.contact) : 0,
        isPrivate: Boolean(body.private),
        userLdap: body.user.roll,
      },
    });

    return Response.json(idea);
  } catch (err) {
    console.error("ERROR:", err);
    return Response.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}