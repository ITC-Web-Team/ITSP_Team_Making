import { prisma } from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json(); // ✅ MUST

        console.log("BODY RECEIVED:", body);
        const idea = await prisma.idea.create({
            data: {
                title: body.title,
                text: body.text,
                flair: body.flair,

                contact: body.contact ? Number(body.contact) : 0, // ✅ correct

                isPrivate: Boolean(body.private), // ✅ correct

                user_Ldap: body.user.roll, // ✅ correct
            },
        });
        console.log("BODY RECEIVED:", body);
        return Response.json(idea);
    } catch (err) {
        console.error(err);

        return Response.json({ error: "Server error" }, { status: 500 });
    }
}