import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");

    if (!idParam) {
      return Response.json({ error: "Missing id" }, { status: 400 });
    }

    const id = Number.parseInt(idParam, 10);

    if (Number.isNaN(id)) {
      return Response.json({ error: "Invalid id" }, { status: 400 });
    }

    const idea = await prisma.idea.findUnique({
      where: { id },
    });

    if (!idea) {
      return Response.json({ error: "Idea not found" }, { status: 404 });
    }

    return Response.json(idea);
  } catch (err) {
    console.error("ERROR:", err);
    return Response.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

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